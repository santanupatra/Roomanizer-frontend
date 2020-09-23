import React,{useState} from 'react';
import './HomePage/style.css';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Pageno extends React.Component {
    render() {
        return (

            <Container className="">
              <Row className="pt-3">
                <Col>
                  <Pagination size="sm" aria-label="Page navigation example">

                    <PaginationItem>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        1
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink next href="#" />
                    </PaginationItem>

                  </Pagination>
                </Col>
              </Row>
            </Container>

        )
    }
}