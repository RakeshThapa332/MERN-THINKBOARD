import mongoose from 'mongoose'
import Note from '../models/Note.js'

export const getAllNotes = async (req,res) =>{
    try{
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)

    }catch(error){
        console.error("Error in getAllNotes controller.",error)
        res.status(500).json({
            message:'Internal Server Error.'
        })
    }      
}


export const getNoteById = async(req,res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note id.' })
        }
        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({
                message : 'Note not found.'
            })
        }
        res.json(note)
    } catch (error) {
        console.error("Error in getNoteById controller.",error)
        res.status(500).json({
            message:'Internal Server Error.'
        })
    }
}


export const createNote = async (req,res)=>{
    try {
        const {title,content} = req.body
        const newNote = new Note ({title,content})

        await newNote.save()
        res.status(201).json({
            message:"Note created successfully."
        })
    } catch (error) {
        console.error("Error in createNote controller.",error)
        res.status(500).json({
            message : 'Internal Server Error.'
        })
    }
}

export const updateNote = async (req,res)=>{
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note id.' })
        }
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(id, {title,content}, {new:true})

        if(!updatedNote){
            return res.status(404).json({
                message :'Note not found.'
            })
        }

        return res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updateNote controller.",error)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export const deleteNote = async (req,res)=>{
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note id.' })
        }
        const deletedNote = await Note.findByIdAndDelete(id)

        if(!deletedNote){
            return res.status(404).json({
                message : "Note not found."
            })
        }
        return res.status(200).json({
            message : "Note deleted successfully.",
            note : deletedNote
        })
    } catch (error) {
        console.error("Error in deleteNote controller.",error)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}