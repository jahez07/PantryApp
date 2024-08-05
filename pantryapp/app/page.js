"use client";
import { firestore } from "@/firebase";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { deleteDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { query, getDoc, doc, setDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  gap: 2,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);

  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const handleOpen = () => setOpen(true); // to open the pop up modal
  const handleClose = () => setOpen(false); // to close the pop up modal

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  // A D D  I T E M  T O  P A N T R Y
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  // R E M O V E  I T E M  F R O M  P A N T R Y
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  useEffect(() => {
    updatePantry();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h3">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add Item
      </Button>
      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height="100px"
          bgcolor="#999"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant={"h2"}
            color={"#333"}
            textAlign={"center"}
            fontWeight={"bold"}
          >
            Inventory Management
          </Typography>
        </Box>

        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {pantry.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              padding={5}
            >
              <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
                {
                  // Capitalize the first letter
                  name.charAt(0).toUpperCase() + name.slice(1)
                }
              </Typography>
              <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
                {count}
              </Typography>
              <Stack direction={"row"} spacing={1}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeItem(name)}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => addItem(name)}
              >
                Add
              </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
