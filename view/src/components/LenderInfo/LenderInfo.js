import React from 'react';
import {Row,Col} from 'react-bootstrap';
import './LenderInfo.css';
import {projects} from '../../services/constante';

function LenderInfo(props) {

    const info = props.info;

    return(
        <Row className="align-items-center mb-4 bg-light">
            <Col xs="1" className="number-list">{props.index}.</Col>
            <Col xs="7" className="py-4 border-right border-secondary">
                <Row>
                    <Col xs="2" >{info.Name}</Col>
                    <Col xs="3" >{info.Email}</Col>
                    <Col xs="2" >{info.Registration}</Col>
                    <Col xs="1" >{info.nbLoans}</Col>
                    <Col xs="2" >${info.TotalLoans}</Col>
                    <Col xs="1" >${info.Balance}</Col>
                    <Col xs="1">{info.PlusBalance ? `$${info.PlusBalance}`:""}</Col>
                </Row>
            </Col>
            <Col xs="4">
            {info.SupportedProjects.map((project,index)=>{
                return(
                    <Row key={index} className="my-3">
                    <Col className="center-text" xs="4">
                        <span style={{backgroundColor:projects[project.Status]}}>
                        &nbsp;&nbsp;</span>&nbsp;{project.Name}
                    </Col>
                    <Col className="center-text" xs="4">
                        {project.Categories.map((category,index) => {
                            return(
                                <span key={index}> {category},&nbsp; </span>
                            )
                        })}
                    </Col>
                    <Col xs="2">
                        {project.Loan}
                    </Col>
                    <Col xs="2">
                        ${project.Repayments} repayed &nbsp;
                         <span>(${project.left} left)</span>
                    </Col>
                    </Row>
                )
            })}             
            </Col>     
        </Row>
    )
}

export default LenderInfo;