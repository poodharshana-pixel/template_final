require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB = process.env.DB_NAME || 'salonDB';
app.use(cors()); app.use(express.json()); app.use(express.static(path.join(__dirname, 'public')));
let appointments;
function clean(b={}) { return {customerName:String(b.customerName||'').trim(),phone:String(b.phone||'').trim(),gender:String(b.gender||''),service:String(b.service||''),stylist:String(b.stylist||''),date:String(b.date||''),timeSlot:String(b.timeSlot||'')}; }
function validate(b) { const d=clean(b); if(Object.values(d).some(v=>!v)) return 'Please fill in all fields.'; if(!/^[0-9]{10}$/.test(d.phone)) return 'Phone must contain exactly 10 digits.'; if(!['Female','Male','Other'].includes(d.gender)) return 'Choose a valid gender.'; return null; }
async function start(){ const client=new MongoClient(URI); try { await client.connect(); appointments=client.db(DB).collection('appointments'); console.log('Connected to MongoDB:',DB); } catch(e) { console.error('MongoDB connection failed:',e.message); console.error('Start local MongoDB or set MONGODB_URI in .env'); process.exit(1); }
app.get('/api/appointments',async(req,res)=>{try{const rows=await appointments.find().sort({customerName:1}).toArray();res.json(rows.map(x=>({...x,_id:x._id.toString()})));}catch(e){res.status(500).json({error:'Could not fetch appointments'});}});
app.post('/api/appointments',async(req,res)=>{const err=validate(req.body);if(err)return res.status(400).json({error:err});try{const doc={...clean(req.body),createdAt:new Date()};const r=await appointments.insertOne(doc);res.status(201).json({...doc,_id:r.insertedId.toString()});}catch(e){res.status(500).json({error:'Could not create appointment'});}});
app.put('/api/appointments/:id',async(req,res)=>{if(!ObjectId.isValid(req.params.id))return res.status(400).json({error:'Invalid ID'});const err=validate(req.body);if(err)return res.status(400).json({error:err});try{const result=await appointments.findOneAndUpdate({_id:new ObjectId(req.params.id)},{$set:clean(req.body)},{returnDocument:'after'});if(!result)return res.status(404).json({error:'Appointment not found'});res.json({...result,_id:result._id.toString()});}catch(e){res.status(500).json({error:'Could not update appointment'});}});
app.delete('/api/appointments/:id',async(req,res)=>{if(!ObjectId.isValid(req.params.id))return res.status(400).json({error:'Invalid ID'});try{const r=await appointments.deleteOne({_id:new ObjectId(req.params.id)});if(!r.deletedCount)return res.status(404).json({error:'Appointment not found'});res.json({message:'Appointment deleted'});}catch(e){res.status(500).json({error:'Could not delete appointment'});}});
app.listen(PORT,()=>console.log(`Salon app running at http://localhost:${PORT}`)); }
start();
