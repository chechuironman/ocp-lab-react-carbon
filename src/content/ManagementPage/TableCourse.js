import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
} from 'carbon-components-react';

export default class TableCourse extends React.Component {
    
    constructor(props){
      super(props);
      this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
      this.headers = [
        {
          key: 'courseID',
          header: 'ID',
        },{
          key: 'courseName',
          header: 'Course',
        },{
          key: 'github',
          header: 'Github',
        },{
          key: 'expireDate',
          header: 'Expire Date',
        },
        {
          key: 'clusterName',
          header: 'Cluster',
        },
        {
          key: 'owner',
          header: 'Owner',
        },
      ];
    }
    
    getKeys = function(){
        // console.log(this.props.data);
      return Object.keys(this.props.data[0]);
    }
    
    getHeader = function(){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })
      // console.log(keys);
    }
    
    getRowsData = function(){
      var items = this.props.data;
      var keys = this.getKeys();
      // console.log(items);
      return items.map((row, index)=>{
        // console.log("items");
        // console.log(row);
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
      })
    }
  

    render() {
        console.log(this.props.data);
        // console.log(this.getRowsData.bind(this));
    return (
    <DataTable
      rows={this.props.data}
      headers={this.headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
      }) => (
        <TableContainer
          title="Courses List"
          description="A collection of courses published.">
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1}>
                    <p>Row description</p>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
    }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}