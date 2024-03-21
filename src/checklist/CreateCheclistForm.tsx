import React, { ChangeEvent, useContext, useState } from 'react';
import './CreateChecklistForm.css'
import ChecklistClient from '../data/axios';
import { MyContext } from '../App';

interface ICreateChecklistForm{
    userId:String 
    createChecklist: (formData:createChecklistReq)=>void;
};

interface IFormInputBox{
    children: React.ReactNode;
    className?: string;
}
const FormInputBox:React.FC<IFormInputBox> = ({children,className})=>{
    return (
        <div className = {`form-input-box ${className || ''}`} >
            {children}
        </div>
    )
}

interface createChecklistReq{
    userId:String;
    checklistName:string;
}


const CreateChecklistForm:React.FC<ICreateChecklistForm> = (props:ICreateChecklistForm)=>{

    const userContext = useContext(MyContext);
    const[formData, setFormData] = useState<createChecklistReq>({
        userId:userContext.userId,
        checklistName:""
    });

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    return(
            <div className='create-form-container'>
            <form>
            <FormInputBox className='create-form'>
                <label htmlFor="checklistName">Checklist Name:</label>
                <input onChange={(e)=>handleInputChange(e)} type="text" id="checklistName" name="checklistName" value={formData?.checklistName}required/>
            </FormInputBox>
            </form>
            <button className='create-button' onClick={(e)=>{e.preventDefault();props.createChecklist(formData)}}>create</button>
            </div>
        
    );

}

export default CreateChecklistForm;