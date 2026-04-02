import e from "express";
import mongoose from "mongoose";

/**
 * jobDescription: String,
 * resume: String,
 * selfDescription: String,
 * 
 * technicalQuestions: [
 *  {
 *    question: String,
 * 
 *   answer: String,
 * intention: String
 * }]
 * 
 * behavioralQuestions: [{}]
 * 
 * skillGap : []
 * 
 * presentationPlan: String
 * 
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
    intention: {    
        type: String,
        required: [true, "Intention is required"]
    }
}, { _id: false })

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
    intention: {    
        type: String,
        required: [true, "Intention is required"]
    }
} , { _id: false})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, { _id: false })

const presentationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focusArea: {
        type: String,
        required: [true, "Focus area is required"]
    },
    tasks : [{
        type: String,
        required: [true, "Task is required"]
    }]
}, { _id: false })


const reportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min : 0,
        max : 100
    },
    technicalQuestions: [technicalQuestionSchema],
    
    behavioralQuestions: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    presentationPlan: [presentationPlanSchema],
}, {timestamps: true})

const Report = mongoose.model("Report", reportSchema)
export default Report