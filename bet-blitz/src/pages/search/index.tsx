import Head from "next/head";
import {createClient} from "@supabase/supabase-js";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {Event} from "@prisma/client";
import {Card, CardHeader, CardTitle} from "~/components/ui/card";
import {Badge} from "~/components/ui/badge";
import 'bootstrap/dist/css/bootstrap.min.css';
import {User} from "lucide-react";

// import '~/styles/search.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useRef} from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {Modal} from "react-bootstrap";

// SearchForm component for rendering a search form
function SearchForm({onSubmit}) {
    // Ref to access the form DOM element
    const formRef = useRef(null);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
     // Extract form values and call the onSubmit function
        onSubmit({
            homeTeam: formRef.current[0].value,
            awayTeam: formRef.current[1].value,
            teamOneName: formRef.current[2].value,
            teamTwoName: formRef.current[3].value,
            commenceTime: formRef.current[4].value,
            createdAt: formRef.current[5].value,
            updatedAt: formRef.current[6].value,
        })

    }
    return (
        /* Row for Home Team and Away Team inputs */
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="homeTeam">
                    <Form.Label>Home Team</Form.Label>
                    <Form.Control/>
                </Form.Group>

                <Form.Group as={Col} controlId="awayTeam">
                    <Form.Label>Away Team</Form.Label>
                    <Form.Control/>
                </Form.Group>

            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="teamOneName">
                    <Form.Label>Team One Name</Form.Label>
                    <Form.Control/>
                </Form.Group>
                <Form.Group as={Col} controlId="teamTwoName">
                    <Form.Label>Team Two Name</Form.Label>
                    <Form.Control/>
                </Form.Group>
            </Row>

            {/*DateTime Picker*/}
            <Row className="mb-3">
                <Form.Group as={Col} controlId="commenceTime">
                    <Form.Label>Commence Time</Form.Label>
                    <Form.Control type="datetime-local"/>
                </Form.Group>
                <Form.Group as={Col} controlId="createdAt">
                    <Form.Label>Created At</Form.Label>
                    <Form.Control type="datetime-local"/>
                </Form.Group>
                <Form.Group as={Col} controlId="updatedAt">
                    <Form.Label>UpdatedAt</Form.Label>
                    <Form.Control type="datetime-local"/>
                </Form.Group>
            </Row>

            {/*clear button*/}
            <Button className="mr-3" variant="dark" onClick={() => formRef.current.reset()}>
                Clear
            </Button>

            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
    );
}

// Constants for Supabase connection
const supabaseUrl = "http://localhost:54321";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0");

// eslint-disable-next-line react/display-name
const CheckModal = forwardRef((props, ref) => {
    // State for modal visibility and current data
    const [show, setShow] = useState(false);
    const [currentData, setCurrentData] = useState({})
    const [currentBet, setCurrentBet] = useState(0)
    const [currentBetAmount, setCurrentBetAmount] = useState(0)
    const handleClose = () => {
        setCurrentBet(0)
        setCurrentBetAmount(0)
        setCurrentData({})
        setShow(false)
    };
    // Handler for showing the modal with specific data
    const handleShow = (currentData) => {
        setCurrentData(currentData)
        setShow(true)
    };
// Expose the handleShow function using ref
    useImperativeHandle(ref, () => ({
        handleShow
    }))
    // Memoized calculation for the bet amount
    const amount = useMemo(() => {
        if(!currentData.teamOneName)return 0
        let odds = currentBet === 1 ? currentData.teamOneOdd : currentData.teamTwoOdd
        if (odds >= 0) {
            return Math.floor((currentBetAmount * (odds / 100))*100)/100
        } else {
            return Math.floor((currentBetAmount * (100 / Math.abs(odds)))*100)/100
        }
    }, [currentBet, currentBetAmount])
    // Render the modal using React Bootstrap components
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {currentData && <Modal.Title>
                        {currentData.teamOneName} vs {currentData.teamTwoName}
                    </Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    {/* Radio buttons for Win and Lose */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Please select</Form.Label>
                            <Form.Check
                                inline
                                label="Win"
                                name="group1"
                                type="radio"
                                id="inline-radio-1"
                                onChange={() => setCurrentBet(1)}
                            />
                            <Form.Check
                                inline
                                label="Lose"
                                name="group1"
                                type="radio"
                                id="inline-radio-3"
                                onChange={() => setCurrentBet(3)}
                            />
                        </Form.Group>
                        {/* Input for the bet amount */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Please enter the bet amount (>100)"
                                          onChange={(e) => setCurrentBetAmount(e.target.value)}/>
                        </Form.Group>
                        {/* Calculate the total amount */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>If you make a bet, you will win: </Form.Label>
                            <Form.Text>
                                {amount}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
})
// Search component for rendering the search page
export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [events, setEvents] = useState<Event[]>([]);
    const checkModalRef = useRef(null);
    const [list, setList] = useState([]);
    // Handler for querying data based on form input
    const handleQuery = async (data) => {

        const queryConnector = []
        // Iterate over form data to build query
        Object.keys(data).forEach(fieldName => {
            switch (fieldName) {
                case "homeTeam":
                case "awayTeam":
                case "teamOneName":
                case "teamTwoName":
                    if (data[fieldName]) {
                        queryConnector.push(`${fieldName}.ilike.%${data[fieldName]}%`)
                    }
                    break;
                case "commenceTime":
                case "createdAt":
                case "updatedAt":
                    if (data[fieldName]) {
                        queryConnector.push(`${fieldName}.gte.${getDateTimeFormat(new Date(data[fieldName]))}`)
                    }
                    break

            }
        })
        console.log(queryConnector)
        const {data: resp, error} = await supabase.from("Event").select("*").or(queryConnector.join(","));
        setList(resp)

    }

    const getDateTimeFormat = (date) => {
        const currentSelectedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        console.log(currentSelectedDate)
        return currentSelectedDate;
    }
    return <>
        <CheckModal ref={checkModalRef}/>
        <Head>
            <title>Search</title>
            <meta name="description" content="Generated by create-t3-app"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Container>
            <h1>Search Page</h1>
            <Row className="mb-3">
                <SearchForm onSubmit={handleQuery}/>
            </Row>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>homeTeam</th>
                    <th>awayTeam</th>
                    <th>teamOneName</th>
                    <th>teamTwoName</th>
                    <th>teamTwoOdd</th>
                    <th>teamOneOdd</th>
                    <th>commenceTime</th>
                    <th>createdAt</th>
                    <th>updatedAt</th>
                    <th>action</th>
                    {/* Add more table headers as needed */}
                </tr>
                </thead>
                <tbody>
                {list.map((item) => (
                    <tr key={item.id}>
                        <td>{item.homeTeam}</td>
                        <td>{item.awayTeam}</td>
                        <td>{item.teamOneName}</td>
                        <td>{item.teamTwoName}</td>
                        <td>{item.teamOneOdd}</td>
                        <td>{item.teamTwoOdd}</td>
                        <td>{item.commenceTime}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.updatedAt}</td>
                        {/*投注*/}
                        <td>
                            <Button variant="dark" onClick={() => checkModalRef.current.handleShow(item)}>
                                Bet</Button>
                        </td>
                        {/* <td>{dateToString(event.commenceTime ? event.commenceTime : new Date())}</td> */}
                        {/* Add more table data cells as needed */}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    </>

}
