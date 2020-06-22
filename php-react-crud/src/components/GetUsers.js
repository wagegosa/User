import React, {Component} from 'react';
import {AppContext} from '../Context';
class GetUsers extends Component{
    static contextType = AppContext;

    componentDidMount(){
        this.context.get_users();
    }

    handleUpdate = (id) => {
        this.context.handleUpdate(id,this.name.value,this.email.value);
    }

    render(){
        let allUsers;
        let mainData;
        
        allUsers = this.context.all_users.map(({id,user_name,user_email,isEditing}) => {
            return isEditing === true ? (
                <tr key={id}>
                <td><input className="form-control" type="text" ref={(item) => this.name = item} defaultValue={user_name}/></td>
                <td><input className="form-control" type="email" ref={(item) => this.email = item} defaultValue={user_email}/></td>
                <td>
                    <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}>Guardar</button>
                    <button onClick={() => this.context.cancelEdit(id)} className="btn btn-danger">Cancelar</button>
                </td>
            </tr>
            ) : (
                <tr key={id}>
                    <td>{user_name}</td>
                    <td>{user_email}</td>
                    <td>
                        <button className="btn btn-warning mr-2" onClick={() => this.context.editMode(id)}>Editar</button>
                        <button onClick={() => this.context.handleDelete(id)} className="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            );
        });

        if(this.context.all_users.length > 0){
            mainData = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers}
                    </tbody>
                </table>
            );
        }
        else{
            mainData = (
                <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">No existen Usuarios!</h4>
                    <hr/>
                    <p>Porfavor ingrese un Usuario.</p>
                </div>
            );
        }
        return(
            <>
            {mainData}
            </>
        );
    }

}
export default GetUsers;