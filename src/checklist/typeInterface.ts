export interface IActionButton{
    "action":()=>void,
    "label": String
}

export interface IDeleteOverlay{
    "checklistId":string;
    "checklistName":string;
}

export interface IcreateChecklistReq{
    userId:String;
    checklistName:string;
}

export interface IMyChecklistProps{
    userId: String
}

export interface IChecklistData{
        "checklistId": string,
        "dateCreated": string,
        "userId": string,
        "checklistName": string
}

export interface ITaskblock{
    "desc":string,
    "created":string
}