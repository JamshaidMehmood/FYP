import React, { useState } from 'react';
import "./artForm.css"; 
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const UploadArtWork = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Generate a preview for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate amount to ensure it's not negative
    const price = parseFloat(e.currentTarget.elements.price.value);
    if (price < 0) {
      setErrorMessage('Price cannot be negative.');
      return;
    }

    // Check for empty fields
    const requiredFields = ['title', 'artistType', 'price', 'medium', 'style', 'category', 'ownership', 'description'];
    for (const field of requiredFields) {
      if (!e.currentTarget.elements[field].value) {
        setErrorMessage(`Please fill in the ${field} field.`);
        return;
      }
    }

    // Clear previous error message
    setErrorMessage(null);

    // Create a FormData object to send the form data including the image file
    const formData = new FormData();
    formData.append('title', e.currentTarget.elements.title.value);
    formData.append('artistType', e.currentTarget.elements.artistType.value);
    formData.append('price', e.currentTarget.elements.price.value);
    formData.append('medium', e.currentTarget.elements.medium.value);
    formData.append('style', e.currentTarget.elements.style.value);
    formData.append('category', e.currentTarget.elements.category.value);
    formData.append('ownership', e.currentTarget.elements.ownership.value);
    formData.append('description', e.currentTarget.elements.description.value);
    formData.append('image', file);
    formData.append('uploadedBy', localStorage.getItem('email'));

    try {
      // Make a POST request to your API endpoint
      const response = await fetch('/api/artworks/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        // The artwork was successfully uploaded
        console.log('Artwork uploaded successfully');
        // Clear form fields
        if (e.currentTarget) {
          e.currentTarget.reset();
        }
        setFile(null);
        setPreview(null);

        navigate('/discoverArt');
      } else {
        const data = await response.json();
        //console.error('Failed to upload artwork:', data.error);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error during artwork upload:', error);
      setErrorMessage('Error uploading artwork. Please try again later.');
    }
  };
  
  return (
    <>
    <div className='nav'>
       <Navbar/>
       </div>
       <br></br>
       <br></br>
    <div className="container1 ">
    <form className="form-container" onSubmit={handleSubmit}>
    <h2>UPLOAD ART</h2>
      <div className="row align-items-start">
      <div className="col">
        <label htmlFor="titleInput" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          placeholder="Enter Title of the Art"
          required= "true"
        />
      </div>

      <div className="col">
        <label htmlFor="artistInput" className="form-label">
          Artist Type
        </label>
        <select className="form-select" id="artistType" required= "true">
            <option>Enter your choice...</option>
            <option value="Amateur">Amateur</option>
            <option value="Hobbyiest">Hobbyiest</option>
            <option value="Professional">Professional</option>
            <option value="Student">Student</option>
        </select>
      </div>
      </div>
     
      <div className="row align-items-start">
      <div className="col">
      <label htmlFor="priceInput" className="form-label">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="form-control"
          placeholder="Enter your price"
          required= "true"
        ></input>
      </div>

      <div className="col">
      <label htmlFor="mediumInput" className="form-label">
          Medium
        </label>
        <select className="form-select" id="medium" required= "true">
            <option>Enter your choice...</option>
            <option value="Matallic">Matallic</option>
            <option value="Water Colors">Water Colors</option>
            <option value="Oil paintings">Oil paintings</option>
            <option value="Stones">Stones</option>
            <option value="Digital">Digital</option>
            <option value="Polaride">Polaride</option>
          </select>
      </div>
      </div>
      
      
      <div className="row align-items-start">
      <div className="col">
      <label htmlFor="styleInput" className="form-label">
          Style
        </label>
        <select className="form-select" id="style" required= "true">
            <option>Enter your choice...</option>
            <option value="Cubism">Cubism</option>
            <option value="Surrealism">Surrealism</option>
            <option value="Expressionism">Expressionism</option>
            <option value="Abstract">Abstract</option>
          </select>
      </div>

      <div className="col">
      <label htmlFor="category" className="form-label">
          Category
        </label>
        <div className="input-group mb-4">
          <select className="form-select" id="category" required= "true">
            <option>Enter your choice...</option>
            <option value="Photography">Photography</option>
            <option value="Painting">Painting</option>
            <option value="Calligraphy">Calligraphy</option>
            <option value="Sketching">Sketching</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
      </div>
     
      <div className="mb-3">
        <label htmlFor="ownershipInput" className="form-label">
          Owner Ship
        </label>
        <select className="form-select" id="ownership" required= "true">
            <option value="Commercial">Commercial</option>
            <option value="Non Commercial">Non Commercial</option>
          </select>
      </div>
      
      <div className="mb-3">
        <label htmlFor="descriptionInput" className="form-label">
          Description
        </label>
        <textarea
          type="text"
          id="description"
          className="form-control"
          placeholder="Enter your description"
          style={{ height: 130 }}
        ></textarea>
      </div>
        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-600">
            Choose a picture:
          </label>
          <input
            type="file"
            id="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            required= "true"
          />
        </div>

        {preview && (
          <div className="mb-4" style={{ maxWidth: '300px' }}>
            <label className="block text-sm font-medium text-gray-600">Preview:</label>
            <div className="mt-1 p-2 border border-gray-300 rounded-md">
              <img src={preview} alt="Preview" className="w-full" />
            </div>
          </div>
        )}

         {/* Error message */}
         {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}


       <button type="submit" className="btn btn-primary">
        Upload
      </button>
    </form>
    </div>
    </>
  );
};
export default UploadArtWork;