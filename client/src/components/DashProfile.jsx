import React,{useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button,TextInput} from 'flowbite-react'
import { getDownloadURL, getStorage, uploadBytesResumable,ref } from 'firebase/storage'
import { app } from '../firebase';
import { signoutSuccess } from '../redux/user/userSlice'

export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError,setImageFileUploadError] = useState(null)
    const filePickerRef = useRef()
    const dispatch = useDispatch()
    console.log(imageFileUploadProgress,imageFileUploadError)
    // console.log('file picker ref is ',filePickerRef)
    const handleImageChange=(e)=>{
          const file = e.target.files[0]
          if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
          }
    }
    useEffect(()=>{
      if(imageFile){
        uploadImage()
      }
    },[imageFile])
   const uploadImage = async()=>{
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //        request.resource.size < 2 * 1024 * 1024 &&
    //         request.resource.contentType.matches('image/*')
    //     }
    //   }
    // }
    const storage = new getStorage(app)
    const fileName = new Date().getTime() +imageFile.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0))
      },
      (error)=>{
         setImageFileUploadError('Could not upload image (File must be less than 2MB)')
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageFileUrl(downloadURL)
        })
      }
    )
   }
   const handleSignout=async()=>{
      try {
        const res = await fetch('/api/user/signout',{
          method:'POST'
        })
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
        }else{
          dispatch(signoutSuccess())
        }
      } catch (error) {
        console.log(error.message)
      }
   }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
      <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
      onClick={()=>filePickerRef.current.click()}>
        <img
          src={imageFileUrl || currentUser.profilePicture}
          alt='user'
          className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
        />
      </div>
      <TextInput
        type='text'
        id='username'
        placeholder='username'
        defaultValue={currentUser.username}
      />
      <TextInput
        type='email'
        id='email'
        placeholder='email'
        defaultValue={currentUser.email}
      />
      <TextInput type='password' id='password' placeholder='password' />
      <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
      </Button>
    </form>
    <div className="text-red-500 flex justify-between mt-5">
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
    </div>
  </div>
  )
}