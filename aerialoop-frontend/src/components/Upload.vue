<template>
    <div class="container">
        <!-- flights Input -->
        <div class="grid-item-1">
            <label for="images" class="drop-container">
                <span class="drop-title">Drop {{ NameCSVs.flights }} files here</span> or
                <input :name='NameCSVs.flights' type="file" accept="text/csv" @change="uploadFile" multiple required>
            </label>
        </div>

        <!-- itinerary Input -->
        <div class="grid-item-2">
            <label for="images" class="drop-container">
                <span class="drop-title">Drop {{ NameCSVs.itinerary }} file here</span>
                or
                <input :name='NameCSVs.itinerary' type="file" accept="text/csv" @change="uploadFile" required>
            </label>
        </div>

        <!-- upload button -->
        <div class="grid-item-3">
            <button @click="sendFile" class="btn">Upload</button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import Swal from 'sweetalert2';
import { inject } from 'vue';
import { UploadData } from '../interfaces/upload.interface';
import { InputFileEvent } from '../interfaces/InputFileEvent.interface';
import { ApiResponse, NameCSVs, ScheduleFlightResponse } from '../interfaces/api.interface';

const swal = inject<typeof Swal>('$swal')!
const emit = defineEmits<{
    (e: 'change', data: ScheduleFlightResponse[]): ScheduleFlightResponse[]
}>();

const files: UploadData = { flights: [], itinerary: undefined };
let formData = new FormData();

const uploadFile = (ev: Event) => {
    const event = ev as InputFileEvent;
    if (!event.target.name || !event.target || !event.target.files) return;
    if (event.target.name === NameCSVs.flights) {
        files.flights = Array.from(event.target.files);
    } else {
        files.itinerary = Array.from(event.target.files).pop();
    }

};

const handleSubmit = () => {
    formData = new FormData();
    if (files.flights)
        files.flights.forEach(flight => formData.append(NameCSVs.flights, flight, flight.name));

    if (files.itinerary)
        formData.append(NameCSVs.itinerary, files.itinerary, files.itinerary.name);

};

const sendFile = async () => {
    if (!files.itinerary || !files.flights?.length) {
        swal.fire("Failed", 'Something went wrong. Missing Files', "error");
        return;
    }
    handleSubmit()
    swal.showLoading()
    axios.post<ApiResponse<ScheduleFlightResponse[]>>('http://localhost:3030/v1/csv/upload', formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then((response) => {
            swal.fire("Success", "Request sent successfully.", "success");
            emit('change', response.data.data);
        })
        .catch((err: Error | unknown) => { swal.fire("Failed", "There was an error Communicating with the API", "error"); console.log('err: ', err) })
        .finally(() => swal.hideLoading())
};
</script>
  
<style>
.container {
    display: grid;
    grid-template-areas:
        "left title right"
        "left footer right";
    padding: 10px;
    gap: 20px;
}

.grid-item-1 {
    grid-area: left;
}

.grid-item-2 {
    grid-area: right;
}

.grid-item-3 {
    grid-area: footer;
}

.drop-container {
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20vh;
    padding: 1vh;
    border-radius: 10px;
    border: 2px dashed #555;
    color: #c2c2c2;
    cursor: pointer;
    transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
    background: #eee;
    border-color: #111;
}

.drop-container:hover .drop-title {
    color: #222;
}

.drop-title {
    color: #c2c2c2;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color .2s ease-in-out;
}

input[type=file] {
    width: 350px;
    max-width: 100%;
    color: #444;
    padding: 5px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #555;
}

input[type=file]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
    background: #0d45a5;
}


button.btn {
    border-radius: 10px;
    border: 3px #555;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #084cdf;
    cursor: pointer;
    transition: border-color 0.25s;
}

button.btn:hover {
    border-color: #0d45a5;
    background: #eee;
    color: #222;
}

button.btn:focus,
button.btn:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}


@media (prefers-color-scheme: light) {
    button.btn {
        background-color: #f9f9f9;
    }
}
</style> 