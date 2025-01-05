import { User } from "firebase/auth/web-extension";
import React, { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";
import firebase from "firebase/compat/app";
export type UserType = User | null



export interface UserContextType{
    currentUser : UserType
}


export interface EditorProps {
  Issave: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string | TrustedHTML>>;
  setData: React.Dispatch<React.SetStateAction<{}>>;
  setWord: React.Dispatch<React.SetStateAction<number>>;
}

export interface UploadDetailsProp extends UserContextType {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setStoryId: React.Dispatch<React.SetStateAction<string>>;
  Details: Record<string,string | Array<string>>;
  navigate : NavigateFunction
}


export interface StoryContextType {
  isDialog: boolean;
  setIsDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StoryCon extends StoryContextType  {
  storyId: string;
  setStoryId: React.Dispatch<React.SetStateAction<string>>;
  setPartId: React.Dispatch<React.SetStateAction<string>>;
  partId : string
}

export interface PanelProp {
  data: number;
  title: string;
  img: string;
}

export interface StoryPanelProp {
  Data: firebase.firestore.DocumentData | undefined
  length: number | undefined
  Parts: firebase.firestore.DocumentData
}



export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { 
  Classname:string;
  children:ReactNode;
}
export type PartCom = Array<firebase.firestore.DocumentData | undefined>


export interface PopupProp<T> extends React.HTMLAttributes<HTMLDivElement>{
  children : ReactNode;
  open : T
}


export interface DetailsProp {
  likes : number
  id? : string
  tag : Array<string>
  category : string
  character : string
  author : string
  desc : string
  title : string
  ImgUrl:string
}
export interface TextDataProps  {
  data: Record<string, string>
  type: string
}