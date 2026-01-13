import Exhibit from "../models/exhibitModel.js";

const getExhibits = async (req, res) => {
    try{
        const exhibits = await Exhibit.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(exhibits);
    }catch(error){
        res.status(500).json({ message: error.message });  
    }
}

const getExhibitById = async (req, res) => {
    try{
        const exhibit = await Exhibit.findById(req.params.id);
        if(!exhibit){
            return res.status(404).json({ message: "Exhibit not found" });
        }
        res.status(200).json(exhibit);
    }catch(error){
        if(error.kind === 'ObjectId'){
            return res.status(404).json({ message: "Exhibit not found" });
        }
        res.status(500).json({ message: error.message });  
    }
}

const createExhibit = async (req, res) => {
    try{
        const exhibit = await Exhibit.create(req.body);
        res.status(201).json(exhibit);
    }
    catch(error){
        res.status(500).json({ message: error.message });  
    }
}

const updateExhibit = async (req, res) => {
    try{
        const exhibit = await Exhibit.findByIdAndUpdate(req.params.id)
        if(!exhibit){
            return res.status(404).json({ message: "Exhibit not found" });
        }
        const updatedExhibit = await Exhibit.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true});
        res.status(200).json(updatedExhibit);
    }
    catch(error){
        res.status(500).json({ message: error.message });  
    }
}

const deleteExhibit = async (req, res) => {
    try{
        const exhibit = await Exhibit.findByIdAndDelete(req.params.id);
        if(!exhibit){
            return res.status(404).json({ message: "Exhibit not found" });
        }
        
        await exhibit.deleteOne()

        res.status(200).json({id: req.params.id, message: "Exhibit deleted successfully"} );  
    }
    catch(error){
        if(error.kind === 'ObjectId'){
            return res.status(404).json({ message: "Exhibit not found" });
        }
        res.status(500).json({ message: error.message });  
    }
}

export  {
    getExhibits,
    getExhibitById, 
    createExhibit,
    updateExhibit,
    deleteExhibit
}