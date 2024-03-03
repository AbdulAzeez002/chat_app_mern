import React, { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IoSearchSharp } from "react-icons/io5";
import debounce from "lodash.debounce";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  height: 300,
};

const fruits = [
  "apple",
  "orange",
  "banana",
  "pear",
  "grapefruit",
  "peach",
  "apricot",
  "nectarine",
  "plum",
  "mango",
  "strawberry",
  "blueberry",
  "kiwi",
  "passionfruit",
  "raspberry",
  "watermelon",
];

const UserSearchModal = ({ open, handleClose }) => {
  const [searchText, setSearchText] = useState("");
  const [listToDisplay, setListToDisplay] = useState(fruits);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const filteredListToDisplay = fruits.filter((fruit) => {
      return fruit.includes(searchText);
    });
    setListToDisplay(filteredListToDisplay);
  };

  const DebouncedSearch = useMemo(() => {
    return debounce(handleSearch, 1000);
  }, [searchText]);

  useEffect(() => {
    DebouncedSearch();
    return () => {
      DebouncedSearch.cancel();
    };
  }, [searchText]);

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <div className="flex justify-between p-4">
            <h2 className="text-xl font-semibold">Search</h2>
            <div onClick={handleClose}>
              <CloseIcon className="cursor-pointer" />
            </div>
          </div>
          <hr className="my-2" />

          <div className="px-4">
            <div className="flex justify-between items-center border rounded ">
              <input
                className=" rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Search ..."
                value={searchText}
                onChange={handleChange}
              />
              <IoSearchSharp className="w-6 h-6 outline-none me-2 cursor-pointer" />
            </div>
          </div>
          <div className="max-h-40 mx-4 px-2 border pb-4 mb-4 rounded-bottom  overflow-y-scroll">
            {listToDisplay?.map((fruit) => (
              <p>{fruit}</p>
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UserSearchModal;
