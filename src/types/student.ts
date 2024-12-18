export interface IStudent {
    id: string;
    name: string;
    birth_date: string;
    location: string;
    pass_number: string;
    phone_number: string;
    pinfl: string;
    study_dir: string;
    course: string;
    father: string;
    mother: string;
    group_id: string;
    group_name : string;
    created_at : string;
    updated_at : string;
    image : IStudentImage;
}

export interface  ICreateStudent {
    name: string;
    birth_date: string;
    location: string;
    pass_number: string;
    phone_number: string;
    pinfl: string;
    study_dir: string;
    course: string;
    father: string;
    mother: string;
    group_id: string;
    image_key :string;
}

export interface  IUpdateStudent {
    id : string;
    name: string;
    birth_date: string;
    location: string;
    pass_number: string;
    phone_number: string;
    pinfl: string;
    study_dir: string;
    course: string;
    father: string;
    mother: string;
    group_id: string;
}

interface IStudentImage {
    name : string;
    url : string;
}

export interface IStudentExcel {
    id: string;
    name: string;
    birth_date: string;
    location: string;
    pass_number: string;
    phone_number: string;
    pinfl: string;
    study_dir: string;
    course: string;
    father: string;
    mother: string;
    group_id: string;
    group_name : string;
    created_at : string;
    updated_at : string;
}

export interface  IImageKey {
    key : string;
}


