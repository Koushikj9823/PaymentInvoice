import React, {Component} from 'react';
import {Table,Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown,faThumbsUp,faImage,faMoneyCheckAlt ,faSearch} from '@fortawesome/free-solid-svg-icons'
class App extends Component {
    // state = {
    //     isLoading : false,
    //     invoices : [
    //         {
    //             "id":"100",
    //             "Vendor":"Microsoft",
    //             "Amount":"₹12350",
    //             "invoice":"1011",
    //             "Date":"08/12/2020"
    //         },
    //         {
    //             "id":"101",
    //             "Vendor":"Tesla",
    //             "Amount":"₹1660",
    //             "invoice":"1012",
    //             "Date":"09/12/2020"
    //         },
    //         {
    //             "id":"102",
    //             "Vendor":"Amazon",
    //             "Amount":"₹1789",
    //             "invoice":"1013",
    //             "Date":"10/12/2020"
    //         },
    //         {
    //             "id":"103",
    //             "Vendor":"Flipkart",
    //             "Amount":"₹2345",
    //             "invoice":"1014",
    //             "Date":"11/12/2020"
    //         }
    //
    //     ]
    // };

    state = {
        isLoading: false,
        invoices:[],
    };
    remove(id){
        let updatedInvoices = [...this.state.invoices].filter(i=>i.id!==id);
        this.setState({invoices : updatedInvoices});
    }

    async componentDidMount(){
        const response = await fetch('https://d1lxmhqu80.execute-api.ap-south-1.amazonaws.com/Dev');
        const body = await response.json();
        this.setState({invoices:body,isLoading:false});
    }
    render() {
        const Loading = this.state.isLoading;
        const allInvoices = this.state.invoices;

        let invoices = allInvoices.map(invoice=>
        <tr key={invoice.id}>
            <td>{invoice.Vendor}</td>
            <td>{invoice.Amount}</td>
            <td>{invoice.Invoice}</td>
            <td>{invoice.Date}</td>
            <td><Button className={"btn btn-lg btn-success"} onClick={() => this.remove(invoice.id)}><FontAwesomeIcon icon={faThumbsUp} /> OK</Button></td>
            <td><Button className={"btn btn-lg btn-danger"} onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faThumbsDown} /> Not OK</Button></td>
            <td><Button className={"btn btn-lg btn-info"} onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%</Button></td>
            <td><Button className={"btn btn-lg btn-warning"} onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faSearch} /> More Info??</Button></td>
            <td><Button className={"btn btn-lg btn-info"} onClick={() => this.remove(invoice.id)}> <FontAwesomeIcon icon={faImage} /> Image</Button></td>
        </tr>


        );
        if(Loading)
            return (<div>Loading mofo.....</div>);
        return (
            <div className="container border border-secondary rounded center">
                <div className={"row"}>
                <div className={"col-12"}>
                    <h4>Pending Invoices</h4>
                </div>
                </div>
                <div className={"row"}>
                    <div className={".col-xs-12 center text-center"}>
                        <Table dark responsive striped bordered hover>
                            <thead>
                            <tr>
                            <th>Vendor</th>
                            <th>Amount</th>
                            <th>Invoice</th>
                            <th>Date</th>
                            <th colSpan={4}>Actions</th>
                            <th>Image</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.invoices.length===0?<tr><td colSpan={9}>All Caught up!</td></tr>:invoices}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;