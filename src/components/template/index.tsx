import { Col, Row } from "antd"
import Header from "../header"
import Navbar from "../navbar"
import React from "react"
import './index.scss'

const Template = (props: { children: React.ReactNode }) => {

    return (
        <>
            <Header />
            <div className="template-space">
                <div className="container">
                    <Row>
                        <Col span={5}>
                            <Navbar />
                        </Col>
                        <Col span={19}>
                            <div className="template-group">
                                {props.children}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Template
