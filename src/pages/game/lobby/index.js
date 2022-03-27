import LobbyWrapper from "./LobbyWrapper";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import BasicButtons from "../../../components/common/Button";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import * as React from "react";
import db from "../../../config/firebase-config"
import {setDoc, doc, getDoc} from "firebase/firestore"
import {v4 as uuid} from 'uuid';
import AddTable from "./AddTable";
import Game from "../gamePlay/Game";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Lobby() {

    const initialFormData = Object.freeze({
        email: sessionStorage.getItem('email'),
        title: "",
        winCon: 0,
        timeLimit: 0,
        gameState: true,
        turn: 0
    });
    const  initialGameData = Object.freeze({
        playerX: "",
        playerY: "",
        gameState: true,
        turn:0,
        1: '0',
        2: '0',
        3: '0',
        4: '0',
        5: '0',
        6: '0',
        7: '0',
        8: '0',
        9: '0',
        10: '0',
        11: '0',
        12: '0',
        13: '0',
        14: '0',
        15: '0',
        16: '0',
        17: '0',
        18: '0',
        19: '0',
        20: '0',
        21: '0',
        22: '0',
        23: '0',
        24: '0',
        25: '0',
        26: '0',
        27: '0',
        28: '0',
        29: '0',
        30: '0',
        31: '0',
        32: '0',
        33: '0',
        34: '0',
        35: '0',
        36: '0',
        37: '0',
        38: '0',
        39: '0',
        40: '0',
        41: '0',
        42: '0',
        43: '0',
        44: '0',
        45: '0',
        46: '0',
        47: '0',
        48: '0',
        49: '0',
        50: '0',
        51: '0',
        52: '0',
        53: '0',
        54: '0',
        55: '0',
        56: '0',
        57: '0',
        58: '0',
        59: '0',
        60: '0',
        61: '0',
        62: '0',
        63: '0',
        64: '0',
        65: '0',
        66: '0',
        67: '0',
        68: '0',
        69: '0',
        70: '0',
        71: '0',
        72: '0',
        73: '0',
        74: '0',
        75: '0',
        76: '0',
        77: '0',
        78: '0',
        79: '0',
        80: '0',
        81: '0',
        82: '0',
        83: '0',
        84: '0',
        85: '0',
        86: '0',
        87: '0',
        88: '0',
        89: '0',
        90: '0',
        91: '0',
        92: '0',
        93: '0',
        94: '0',
        95: '0',
        96: '0',
        97: '0',
        98: '0',
        99: '0',
        100: '0',
        101: '0',
        102: '0',
        103: '0',
        104: '0',
        105: '0',
        106: '0',
        107: '0',
        108: '0',
        109: '0',
        110: '0',
        111: '0',
        112: '0',
        113: '0',
        114: '0',
        115: '0',
        116: '0',
        117: '0',
        118: '0',
        119: '0',
        120: '0',
        121: '0',
        122: '0',
        123: '0',
        124: '0',
        125: '0',
        126: '0',
        127: '0',
        128: '0',
        129: '0',
        130: '0',
        131: '0',
        132: '0',
        133: '0',
        134: '0',
        135: '0',
        136: '0',
        137: '0',
        138: '0',
        139: '0',
        140: '0',
        141: '0',
        142: '0',
        143: '0',
        144: '0',
        145: '0',
        146: '0',
        147: '0',
        148: '0',
        149: '0',
        150: '0',
        151: '0',
        152: '0',
        153: '0',
        154: '0',
        155: '0',
        156: '0',
        157: '0',
        158: '0',
        159: '0',
        160: '0',
        161: '0',
        162: '0',
        163: '0',
        164: '0',
        165: '0',
        166: '0',
        167: '0',
        168: '0',
        169: '0',
        170: '0',
        171: '0',
        172: '0',
        173: '0',
        174: '0',
        175: '0',
        176: '0',
        177: '0',
        178: '0',
        179: '0',
        180: '0',
        181: '0',
        182: '0',
        183: '0',
        184: '0',
        185: '0',
        186: '0',
        187: '0',
        188: '0',
        189: '0',
        190: '0',
        191: '0',
        192: '0',
        193: '0',
        194: '0',
        195: '0',
        196: '0',
        197: '0',
        198: '0',
        199: '0',
        200: '0',
        201: '0',
        202: '0',
        203: '0',
        204: '0',
        205: '0',
        206: '0',
        207: '0',
        208: '0',
        209: '0',
        210: '0',
        211: '0',
        212: '0',
        213: '0',
        214: '0',
        215: '0',
        216: '0',
        217: '0',
        218: '0',
        219: '0',
        220: '0',
        221: '0',
        222: '0',
        223: '0',
        224: '0',
        225: '0',
    })

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [formData, updateFormData] = useState(initialFormData)
    const gameData = initialGameData
    const [pKey, generatePKey] = useState("")
    const [searchKey, setSearchKey] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])

    const generateKey = function () {
        const unique_id = uuid();
        return unique_id.slice(0, 8);
    }
    const handleCreate = () => {
        setOpen(true)
        generatePKey(generateKey)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const joinChange = (e) => {
        setSearchKey(e.target.value.trim())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        sessionStorage.setItem('gameKey', pKey);
        const docRef1 = doc(db, "Game", pKey);
        await setDoc(docRef1, gameData);
        const docRef = doc(db, "User", pKey);
        await setDoc(docRef, formData);
        navigate('/game')
    };

    const handleJoin = async (e) => {

        e.preventDefault()
        sessionStorage.setItem('gameKey', searchKey)

        const docRef1 = doc(db, "Game", searchKey);
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            navigate('/game')
        } else {
            console.log("No such document!");
            toast.error('Please fill in the correct Room-key');
        }
    }

    return (
        <LobbyWrapper>
            <div className="wrapper-box">
                <div className="container pt-5">
                    <div className="row mt-2">
                        <div className="col-12 t-tab border border-black">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col" className="t-stick">Best of</th>
                                    <th scope="col" className="t-stick">Rooms</th>
                                    <th scope="col" className="t-stick">Owner</th>
                                    <th scope="col" className="t-stick">Time-Limit</th>
                                </tr>
                                </thead>
                                <AddTable/>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center">
                        <div className="col-6 p-0">
                            <TextField id="outlined-search" label="Search field" type="search"
                                       label="Join Room" className="w-100" onChange={joinChange}/>
                        </div>
                        <div className="col-2 d-flex justify-content-center m-1" onClick={handleJoin}>
                            <BasicButtons title={'Join'}/>
                        </div>
                        <div className="col-2 d-flex justify-content-center m-1" onClick={handleCreate}>
                            <BasicButtons title={'Create Room'}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                className="d-flex justify-content-center align-items-center"

            >
                <form className="border border-secondary p-4 m-2 rounded-2 row bg-white">
                    <div className="heading-container mt-2 d-flex flex-row-reverse justify-content-center">
                        <h3>Create-Lobby</h3>
                    </div>
                    <TextField className="my-3"
                               label="email"
                               disabled={true}
                               value={sessionStorage.getItem('email')}
                               onChange={handleChange}
                    />
                    <TextField className="my-3"
                               label="Title"
                               name="title"
                               variant="filled"
                               type="text"
                               required
                               onChange={handleChange}
                    />
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Win-condition</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="winCon"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="2" control={<Radio/>} label="Best of 2"/>
                            <FormControlLabel value="3" control={<Radio/>} label="Best of 3"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Time Limit</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="timeLimit"
                            required
                            onChange={handleChange}
                        >
                            <FormControlLabel value="10" control={<Radio/>} label="10 minute"/>
                            <FormControlLabel value="no" control={<Radio/>} label="No time limit"/>
                        </RadioGroup>
                    </FormControl>

                    <div className="pt-2">
                        <div className="col d-flex justify-content-center">
                            <Button type="submit" variant="contained" color="secondary" className="mx-3"
                                    onClick={handleClose}>
                                Close
                            </Button>

                            <Button type="submit" variant="contained" color="primary" className="mx-3"
                                    onClick={handleSubmit}>
                                Create
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <ToastContainer />
        </LobbyWrapper>

    );
}
