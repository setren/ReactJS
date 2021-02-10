// import * as React from "react";
// import { Admin, Resource } from 'react-admin';
// import { UserList } from './users';
// import jsonServerProvider from 'ra-data-json-server';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
// const App = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource name="users" list={UserList} />
//   </Admin>
// );
// export default App;

import { Component } from "react";

class Admin extends Component {
  onSubmit(e) {
    e.preventDefault()
    localStorage.setItem('token', e.target[0].value)
    console.log(e.target[0].value)
    console.log(e.target[1].value)
  }
  render() {
    return (
      <div>halaman admin</div>
    )
  }
}

export default Admin