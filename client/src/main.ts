import "es6-promise"; // promise polyfill
import * as promptly from "promptly";
import {NoteApi, Note} from "./server";

const noteApi = new NoteApi({ urlPrefix: "http://localhost:8082" });
const PromptOptions = {
    add: "1",
    viewAll: "2",
    viewByText: "3"
};

selection();

function selection() {
    const options = Object.keys(PromptOptions).map(k => (PromptOptions as any)[k]);
    const optionsStr = options.join(", ");

    promptly.choose(`Do you want to:\n\n(1) Add a note\n(2) View all the notes\n(3) View all notes with specific text\n\nSelect (${optionsStr}):`, options, (err, value) => {
        switch(value) {
            case PromptOptions.add:
                addNote();
                break;
            case PromptOptions.viewAll:
                viewNotes();
                break;
            case PromptOptions.viewByText:
                viewNotesByText();
                break;
            default:
                console.log("Invalid selection.");
                selection();
                break;
        }
    });
}

function addNote() {
    promptly.prompt('Enter note text: ', (err, value) => {
        console.log("Adding note...");
        noteApi.add({
            creationDate: new Date(),
            text: value
        }).then(() => {
            console.log("Added note.");
        }).catch(err => {
            console.log(err.toString());
        }).then(() => {
            selection();
        })
    });
}

function viewNotes() {
    console.log("Retrieving notes...");
    noteApi.getAll().then(notes => {
        console.log(`Note count: ${notes.length}`);
        outputNotes(notes);
    }).catch(err => {
        console.log(err.toString());
    }).then(() => {
        selection();
    });
}

function viewNotesByText() {
    promptly.prompt('Enter note text to search for: ', (err, value) => {
        console.log("Retrieving notes...");
        noteApi.getAllWithText({ text: value }).then(notes => {
            console.log(`Note count: ${notes.length}`);
            outputNotes(notes);
        }).catch(err => {
            console.log(err.toString());
        }).then(() => {
            selection();
        });
    });
}

function outputNotes(notes: Note[]) {
    notes.forEach((note, i) => {
        if (i === 0) {
            outputSeparator();
        }
        outputNote(note);
        outputSeparator();
    });
}

function outputNote(note: Note) {
    console.log(`Date: ${note.creationDate.toString()}`);
    console.log(`Text: ${note.text}`);
}

function outputSeparator() {
    console.log("===============");
}
