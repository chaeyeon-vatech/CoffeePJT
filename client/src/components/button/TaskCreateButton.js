import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {TaskCreateMutation} from "../../util/mutation";
import {TaskQuery} from "../../util/query";



function CreateButton() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const [create, {loading}] = useMutation(TaskCreateMutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {
                title: title
            },
        }
    )

    return (
        <table className="employees-table">
            <thead className="employees-table-head">

            <tr style={{marginBottom: 20, marginLeft: 40}}>
                <th>Content</th>
                <th>Title</th>
                <th>Create</th>


            </tr>
            </thead>
            <tbody className="employees-table-body">

            <tr style={{marginBottom: 20}}>

                <td><input type="text" placeholder="title" onChange={e => setTitle(e.target.value)}/></td>
                <td><TextField type='submit'
                               onClick={create}
                               disabled={loading}
                               value="↳Create"/></td>

            </tr>
            </tbody>
        </table>


    );

}


export default CreateButton;
