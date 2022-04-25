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
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Lobby() {

    const initialFormData = Object.freeze({
        email: sessionStorage.getItem('email'),
        title: "",
        timeLimit: 0,
        gameState: true,
        turn: 0,
        pubLic: "no",
        WinState: false,
        UniqueKey: "",
        winCon: 0
    });
    const initialGameData = Object.freeze({
        winX: 0,
        winY: 0,
        winCon: 0,
        playerX: "",
        playerY: "",
        gameState: false,
        turn: 0,
        ironX: "",
        ironO:"",
        timeX:20,
        timeO:20,
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
        19: '',
        20: '',
        21: '',
        22: '',
        23: '',
        24: '',
        25: '',
        26: '',
        27: '',
        28: '',
        29: '',
        30: '',
        31: '',
        32: '',
        33: '',
        34: '',
        35: '',
        36: '',
        37: '',
        38: '',
        39: '',
        40: '',
        41: '',
        42: '',
        43: '',
        44: '',
        45: '',
        46: '',
        47: '',
        48: '',
        49: '',
        50: '',
        51: '',
        52: '',
        53: '',
        54: '',
        55: '',
        56: '',
        57: '',
        58: '',
        59: '',
        60: '',
        61: '',
        62: '',
        63: '',
        64: '',
        65: '',
        66: '',
        67: '',
        68: '',
        69: '',
        70: '',
        71: '',
        72: '',
        73: '',
        74: '',
        75: '',
        76: '',
        77: '',
        78: '',
        79: '',
        80: '',
        81: '',
        82: '',
        83: '',
        84: '',
        85: '',
        86: '',
        87: '',
        88: '',
        89: '',
        90: '',
        91: '',
        92: '',
        93: '',
        94: '',
        95: '',
        96: '',
        97: '',
        98: '',
        99: '',
        100: '',
        101: '',
        102: '',
        103: '',
        104: '',
        105: '',
        106: '',
        107: '',
        108: '',
        109: '',
        110: '',
        111: '',
        112: '',
        113: '',
        114: '',
        115: '',
        116: '',
        117: '',
        118: '',
        119: '',
        120: '',
        121: '',
        122: '',
        123: '',
        124: '',
        125: '',
        126: '',
        127: '',
        128: '',
        129: '',
        130: '',
        131: '',
        132: '',
        133: '',
        134: '',
        135: '',
        136: '',
        137: '',
        138: '',
        139: '',
        140: '',
        141: '',
        142: '',
        143: '',
        144: '',
        145: '',
        146: '',
        147: '',
        148: '',
        149: '',
        150: '',
        151: '',
        152: '',
        153: '',
        154: '',
        155: '',
        156: '',
        157: '',
        158: '',
        159: '',
        160: '',
        161: '',
        162: '',
        163: '',
        164: '',
        165: '',
        166: '',
        167: '',
        168: '',
        169: '',
        170: '',
        171: '',
        172: '',
        173: '',
        174: '',
        175: '',
        176: '',
        177: '',
        178: '',
        179: '',
        180: '',
        181: '',
        182: '',
        183: '',
        184: '',
        185: '',
        186: '',
        187: '',
        188: '',
        189: '',
        190: '',
        191: '',
        192: '',
        193: '',
        194: '',
        195: '',
        196: '',
        197: '',
        198: '',
        199: '',
        200: '',
        201: '',
        202: '',
        203: '',
        204: '',
        205: '',
        206: '',
        207: '',
        208: '',
        209: '',
        210: '',
        211: '',
        212: '',
        213: '',
        214: '',
        215: '',
        216: '',
        217: '',
        218: '',
        219: '',
        220: '',
        221: '',
        222: '',
        223: '',
        224: '',
        225: '',
    })

    const navigate = useNavigate()
    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [formData, updateFormData] = useState(initialFormData)
    const [gameData, upDateGameData] = useState(initialGameData)
    const [pKey, generatePKey] = useState("")
    const [searchKey, setSearchKey] = useState('')
    sessionStorage.setItem('timeX', "20")
    sessionStorage.setItem('timeO', "20")
    sessionStorage.setItem('Iron', "no")
    sessionStorage.setItem('Bomb', "no")

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])

    const validate = (title, win) => {
        const errors = [];

        if (title === "") {
            errors.push("Can't be empty");
        }
        if (win === 0) {
            errors.push("empty");
        }

        return errors;
    }

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
            [e.target.name]: e.target.value.trim(),
            UniqueKey: pKey
        })
        if (e.target.name === "winCon") {
            upDateGameData({
                ...gameData,
                [e.target.name]: parseInt(e.target.value.trim())
            })
        }
    }

    const joinChange = (e) => {
        setSearchKey(e.target.value.trim())
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        sessionStorage.setItem('gameKey', pKey);
        const errors = validate(formData.title, formData.winCon)

        if (errors.length === 0) {
            const docRef1 = doc(db, "Game", pKey);
            await setDoc(docRef1, gameData);
            const docRef = doc(db, "User", pKey);
            await setDoc(docRef, formData);
            navigate('/game')
        }else {
            toast.error('Please fill in all the Criteria');
        }
    };

    const handleJoin = async (e) => {

        e.preventDefault()
        sessionStorage.setItem('gameKey', searchKey)
        const docRef1 = doc(db, "Game", searchKey);
        const docSnap = await getDoc(docRef1);
        if (docSnap.exists()) {
            navigate('/game')
        } else {
            toast.error('Please fill in the correct Room-key');
        }
    }

    return (
        <LobbyWrapper>
            <div className="wrapper-box">
                <div className="container pt-5">
                    <div className="row mt-2">
                        <div className="col-12 t-tab box">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col" className="t-stick">Best of</th>
                                    <th scope="col" className="t-stick">Rooms</th>
                                    <th scope="col" className="t-stick">Owner</th>
                                    <th scope="col" className="t-stick">Public</th>
                                </tr>
                                </thead>
                                <AddTable/>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center">
                        <div className="col-6 p-0 pt-1">
                            <TextField id="outlined-search" type="search"
                                       label="Join Room" className="w-100" onChange={joinChange}/>
                        </div>
                        <div className="col-2 d-flex justify-content-center" onClick={handleJoin}>
                            <BasicButtons title={'Join'}/>
                        </div>
                        <div className="col-2 d-flex justify-content-center" onClick={handleCreate}>
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
                               label="UniqueKey"
                               disabled={true}
                               value={pKey}
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
                            type="number"
                            onChange={handleChange}

                        >
                            <FormControlLabel value={2} control={<Radio/>} label="Best of 2"/>
                            <FormControlLabel value={3} control={<Radio/>} label="Best of 3"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Public</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="pubLic"
                            required
                            onChange={handleChange}
                        >
                            <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                            <FormControlLabel value="no" control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>

                    <div className="pt-2">
                        <div className="col d-flex justify-content-center">
                            <Button type="submit" variant="contained" color="secondary" className="mx-3 m"
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
            <ToastContainer/>
        </LobbyWrapper>

    );
}
