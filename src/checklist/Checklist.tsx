import React, { useContext, useEffect, useState } from "react";
import ChecklistClient from "../data/axios";
import './Checklist.css'
import CreateChecklistForm from "./CreateCheclistForm";
import {ITaskblock,IActionButton,IMyChecklistProps,IChecklistData,IcreateChecklistReq, IDeleteOverlay} from './typeInterface'
import { MyContext } from "../App";

const TaskBlock: React.FC<ITaskblock> = ({ desc,created }) => {
    return (
      
        <>
            <a className="task-desc-block">
                {desc}
            </a>
            <a className="task-created-block">
                Date Created: {created}
            </a>
        </>
    );
  }



const ActionButton:React.FC<IActionButton> = ({action,label})=>{
    return (
        <div className="button-container">
            <button  className="action-button" onClick={()=>{action()}}>{label}</button>
        </div>
    );
}


const MyChecklist:React.FC<IMyChecklistProps> = (props:IMyChecklistProps)=>{

    const [data,setData] = useState<null|IChecklistData[]>(null);
    const [error,setError] = useState<boolean>(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [deleteDialogueProps, setDeleteDialogueProps] = useState<{"id": string; "checklistName":string}>({id:"",checklistName:""});

    const contextData = useContext(MyContext);
    
    const fetchData = async ()=>{
        try{
            const res = await ChecklistClient.get(`/checklist/getByUserId/${contextData.userId}`);
        setData(res.data);
        }catch(error){
            setError(true);
        }
    }

    const createChecklist = (formData:IcreateChecklistReq)=>{
        const uri = '/checklist/';
        ChecklistClient.post(uri,formData).then(()=>{
            setIsCreateDialogOpen(false);
            fetchData();
        });
    }

    const deleteChecklist = (checklistId: String)=>{
        const uri = '/checklist/'
        ChecklistClient.delete(`${uri}${checklistId}`).then(()=>{
            setIsDeleteDialogOpen(false);
            fetchData();
        }).catch((response)=>{console.log(response)});
    }

    const DeleteOverlay:React.FC<IDeleteOverlay> = ({checklistId,checklistName})=>{

        return (
            <div className="overlay">
                <div className="delete-dialog-box">
                    <ActionButton label="X" action={()=>{setIsDeleteDialogOpen(false)}}/>
                   <div className="dialog-content-flex-box">
                    <div className="dialog-content">
                            Do you really want to delete the checklist {checklistName}
                    </div>
                    <div className="delete-dialog-action-flex">
                        <button className="delete-dialog-action-sec" onClick={()=>setIsDeleteDialogOpen(false)}>No</button>
                        <button className="delete-dialog-action-primary" onClick={() => deleteChecklist(checklistId)}>Yes</button>
                        
                    </div>
                   </div>
                </div>
            </div>
        )
    
    }


    useEffect(()=>{
        console.log(props.userId);

        fetchData();

    },[props.userId])

    if(error) return <>Error in data fetch</>;

    return <>
            <div className="task-container">
                
                    {data?.sort(((a,b)=>a.checklistName.localeCompare(b.checklistName))).map((x)=>{
                         return <div className="task-cnt-act-flex-box">
                            <div className="task-flex-box">
                                <TaskBlock desc={x.checklistName} created={x.dateCreated}/>
                            </div>
                            <div className="task-action-container">
                                <button className="complete-button">Done</button>
                                <button data-checklistid={x.checklistName} className="delete-button" onClick={(e)=>{setDeleteDialogueProps({checklistName:x.checklistName,id:x.checklistId});setIsDeleteDialogOpen(true);}}>X</button>
                            </div>

                            {isDeleteDialogOpen && <DeleteOverlay checklistName={deleteDialogueProps.checklistName} checklistId={deleteDialogueProps.id} />}
                        </div>
                         })}

                <ActionButton label="Add New Checklist" action={()=>{setIsCreateDialogOpen(true)}}/>
            </div>
            
            {isCreateDialogOpen && <div className="overlay">
                <div className="create-dialog-box">
                    <ActionButton label="X" action={()=>{setIsCreateDialogOpen(false)}}/>
                    <CreateChecklistForm userId={props.userId} createChecklist={(formData)=>{createChecklist(formData)}}/>
                </div>
                
            </div>}
            
            
    </>
}

export default MyChecklist;
