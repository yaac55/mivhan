import React, {useState} from 'react';
import {Button,Form,Row,Col,OverlayTrigger} from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'
import './Filter.css';
import {BsFilterRight} from "react-icons/bs";
import {RiArrowDownSLine} from "react-icons/ri";
import {BiSearch,BiDollar} from "react-icons/bi";
import {selectText,selectValue} from '../../services/constante';

function Filter(props){

    const [textSearch,setTextSearch] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);

    const popover = (
        <Popover id="popover-basic" className="mb-3">
        <div>
          <Form.Check
            className="mt-3 ml-3"
            inline
            name="radio-amount-filter"
            onChange={(e) => props.handleChangeTypeFilterAmount(e)}
            type="radio"
            value="Under"
            label="Under"
            />
           <Form.Check
            className="mt-3 ml-3"
            inline
            name="radio-amount-filter"
            onChange={(e) => props.handleChangeTypeFilterAmount(e)}
            type="radio"
            value="Over"
            label="Over"
            />
        </div>
        <Popover.Content>
            <Form.Group as={Row} className="mb-3 mt-4">
            <Form.Label column sm="2">
                <BiDollar className="dollar"/>
            </Form.Label>
                <Form.Control type="texte"
                 className="input-without-border"
                 onChange={(e) => props.handleChangeValueFilterAmount(e)}/>
            </Form.Group>
            <div className="mr-4 mb-3 mt-5 align-go">
                <span className="go" 
                onClick={() =>{
                    props.filterTotalAmount();
                    setShowOverlay(false);
                }}
                >GO</span>
            </div>
        </Popover.Content>
        </Popover>
    );

    return(
        <Form>
            <Row className="align-items-center mb-4 mt-2 ">
                <Col xs="auto" className="pr-1">
                    <Form.Label className="mb-0" ><BiSearch/> Search by:Lender's</Form.Label>
                </Col>
                <Col className="pl-0" xs="auto">
                    <Form.Control
                    className="select-no-box-and-padding pl-0 bg-light"
                    as="select"
                    onChange={e => props.setSearch(e.target.value)}> 

                    {selectText.map((columnName,index)=>{
                        return(
                            <option key={index} value={selectValue[columnName]}>
                            {columnName}</option>
                        )
                    })}
                    
                    </Form.Control>
                </Col>
                <Col xs="auto" className="my-1">
                    <Form.Control type="text"
                    onChange={e => setTextSearch(e.target.value)}
                    />
                </Col>
                <Col xs="auto" className="my-1">
                    <Button variant="dark" onClick={() => props.filterData(textSearch)}
                    >Search</Button>
                </Col>
            </Row>
            <Row className="align-items-center mb-4">
                <Col className="pr-1" xs="auto">
                    <span className="filter"><BsFilterRight/>Filter by</span>
                </Col>
                <Col className="pr-1" xs="auto">
                    <OverlayTrigger className="select-no-box-and-padding pl-0 bg-light" 
                    show={showOverlay} placement="right" 
                    overlay={popover} placement="bottom">
                        <span>Total amount <RiArrowDownSLine 
                        onClick={() => setShowOverlay(true)} 
                        className="arrow-down"/></span>
                    </OverlayTrigger>
                </Col>
                <Col className="pl-0" xs="auto">
                    <Form.Control
                        className="select-no-box-and-padding pl-0 bg-light"
                        as="select"
                        >
                        <option value="" selected disabled>Project Status</option>
                    </Form.Control>
                </Col>
                <Col className="pl-0" xs="auto">
                    <Form.Control
                        className="select-no-box-and-padding pl-0 bg-light"
                        as="select"
                        >
                        <option value="" selected disabled>Category</option>
                    </Form.Control>
                </Col>
                <Col xs="auto" className="my-1">
                    <span className="go">GO</span>
                </Col>

            </Row>
        </Form>
    )
}

export default Filter;