import Head from "next/head";
import {createClient} from "@supabase/supabase-js";
import {useEffect, useState} from "react";
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

function SearchForm({onSubmit}) {
    const formRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
      
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
            <Button className="mr-3" onClick={() => formRef.current.reset()}>
                Clear
            </Button>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}


const supabaseUrl = "http://localhost:54321";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0");
export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [events, setEvents] = useState<Event[]>([]);

    const [list, setList] = useState([]);

    /*
        const fetchData = async () => {
            if (!selectedDate) return;
            console.log(selectedDate, searchQuery);
            const currentSelectedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
            const timestamp = selectedDate.getTime();
            const {data, error} = await supabase
                .from("Event")
                .select("*")
                .or(`teamOneName.ilike.%${searchQuery}%,teamTwoName.ilike.%${searchQuery}%`)
                .gte("createdAt", currentSelectedDate);
            //.gte("createdAt", timestamp)

            console.log(data, error, "database");
            setList(data)
        };
    */
    const handleQuery =async (data) => {

        const queryConnector = []
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
                <Row>

                </Row>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>homeTeam</th>
                        <th>awayTeam</th>
                        <th>teamOneName</th>

                        <th>createdAt</th>
                        {/* Add more table headers as needed */}
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item) => (
                        <tr key={item.id}>
                            <td>{item.homeTeam}</td>
                            <td>{item.awayTeam}</td>
                            <td>{item.teamOneName}</td>
                            <td>{item.createdAt}</td>

                            {/* <td>{dateToString(event.commenceTime ? event.commenceTime : new Date())}</td> */}
                            {/* Add more table data cells as needed */}
                        </tr>
                    ))}
                    </tbody>
                </Table>
           </Container>
        </>
  
}
