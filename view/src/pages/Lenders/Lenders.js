import React, {useContext,useState} from 'react';
import Filter from "../../components/Filter/Filter";
import LenderInfo from "../../components/LenderInfo/LenderInfo";
import TotalsLoans from "../../components/TotalsLoans";
import {userConnect} from '../../store/userConnect';
import {data} from '../../services/constante';
import {useNavigate } from "react-router-dom";
import {Container,Row,Col} from 'react-bootstrap';
import { SiMicrosoftexcel } from "react-icons/si";


function Lenders(props) {

    const [search,setSearch] = useState("Name");
    const [lenders,setLenders] = useState(data);
    const [lendersFilter,setLendersFilter] = useState(data);
    const [typeFilterAmount,setTypeFilterAmount] = useState("");
    const [valueFilterAmount,setValueFilterAmount] = useState();
    const {connect,setConnect} = useContext(userConnect);
    let history = useNavigate();
    
    
    const handleChangeTypeFilterAmount = (e) => {
        setTypeFilterAmount(e.target.value)
    }

    const handleChangeValueFilterAmount = (e) => {
        setValueFilterAmount(e.target.value)
    }

    const filterData = (text) => {
        let searchItems = search.split("-"); 
        
        const lendersFilter = lenders
        .filter((lender) => function recursiveSearch(searchObject, searchItems){
            if(Array.isArray(searchObject)) {
                let arrayObject = searchObject.filter((obj) => recursiveSearch(obj,searchItems))
                return(arrayObject && arrayObject.length > 0);
            } else {
                if(searchItems && searchItems.length > 0) {
                    if(searchObject && searchObject[searchItems[0]]) {
                        return recursiveSearch(searchObject[searchItems[0]], searchItems.slice(1));
                    }
                    return false;
                } else {
                    return searchObject.toLowerCase().includes(text.toLowerCase());
                }
            }
        }(lender, searchItems));

        setLendersFilter(lendersFilter);
    }

    const filterTotalAmount = () => {
        if(typeFilterAmount != " " && valueFilterAmount > 0)
        {
            const filterByTotalAmount = lendersFilter.filter((lender) =>{
                if(typeFilterAmount === "Under")
                {
                    if(lender["TotalLoans"] < valueFilterAmount)
                        return true;
                }
                else
                {
                    if(lender["TotalLoans"] > valueFilterAmount)
                        return true;
                }
            })
            setLendersFilter(filterByTotalAmount);
        }
        
    }

        return(
            <Container>
                <Row className="justify-content-end mt-4 mb-4">
                    <Col xs="11" >
                        <h2> Lenders </h2>
                    </Col>
                </Row>
                <Row className="justify-content-end mt-4 mb-4">
                    <Col xs="7" className="bg-light">
                        <Filter setSearch={setSearch}
                        filterData={(text)=>filterData(text)}
                        handleChangeTypeFilterAmount={handleChangeTypeFilterAmount}
                        handleChangeValueFilterAmount={handleChangeValueFilterAmount}
                        filterTotalAmount={filterTotalAmount}></Filter>
                    </Col>
                    <Col xs="1"></Col>
                    <Col xs="3" className="bg-light">
                        <TotalsLoans></TotalsLoans>
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col xs="1"></Col>
                    <Col xs="auto"><span style={{backgroundColor:"#F7B500"}}>
                        &nbsp;&nbsp;</span>&nbsp;Fundraising</Col>
                    <Col xs="auto"><span style={{backgroundColor:"#09FB82"}}>
                        &nbsp;&nbsp;</span>&nbsp;Repayments</Col>
                    <Col xs="auto" className="mr-auto"><span style={{backgroundColor:"#262E3F"}}>
                        &nbsp;&nbsp;</span>&nbsp;Finished</Col>
                    <Col xs="1.5"style={{color:"#44D7B6"}}><span><SiMicrosoftexcel/>
                    </span> Export</Col>
                </Row>
                <Row className="justify-content-end">
                    <Col xs="7">
                        <Row>
                            <Col xs="2">Name</Col>
                            <Col xs="3">Email</Col>
                            <Col xs="2">Registration</Col>
                            <Col xs="1"># of loans</Col>
                            <Col xs="2">Total Loans</Col>
                            <Col xs="1">Balance</Col>
                            <Col xs="1"></Col>
                        </Row>
                    </Col>
                    <Col xs="4">
                        <Row>
                            <Col xs="4">Supported projects</Col>
                            <Col xs="4">Categories</Col>
                            <Col xs="2">Loans</Col>
                            <Col xs="2">Repayments</Col>
                        </Row>
                    </Col>
                        
                </Row>
                {lendersFilter.map((info,index)=>{
                    return(
                        <LenderInfo key={index} info={info} index={index+1}></LenderInfo>
                    )
                })}
            </Container>
        )
}

export default Lenders;