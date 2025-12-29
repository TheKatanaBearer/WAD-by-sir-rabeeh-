const form=document.querySelector('form');

form.addEventListener('submit',(e)=>{

    let isValid=true;
    const target=e.target;

    // this here is the function for demarcation of an error
    function showError(input,validity){
        if(validity){
            input.style.backgroundColor='white';
        }
        else{
            input.style.backgroundColor='red';
        }
    }

    // for 'Name'

    const input=target.querySelector('input[name="Name"]');
    const nameCritera=/^[A-Za-z\s]+$/;

    if(!nameCritera.test(input.value)){
        isValid=false;
        showError(input,isValid);
    }
    
    else{
        showError(input,true);

    }

   

     // for email

     const emailInput=target.querySelector('input[name="Email"]');
     const emailCriteria=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailCriteria.test(emailInput.value)){
        isValid=false;
        showError(emailInput,isValid);
    }
    else{
        showError(emailInput,true);
    }

   

    // for telephone

    const phoneInput=target.querySelector('#telephone');
    const phoneCriteria=/^[0-9]{10,15}$/;

    if(!phoneCriteria.test(phoneInput.value)){
        isValid=false;
        showError(phoneInput,isValid);
    }
    
    else{
        showError(phoneInput,true);

    }


    //  Validate Product Link (URL)
    const productInput = target.querySelector('input[name="product"]');
    
    const urlCriteria = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

   
    if (productInput.value !== "") {
        if (!urlCriteria.test(productInput.value.trim())) {
            isValid = false;
            showError(productInput, false);
        } else {
            showError(productInput, true);
        }
    } else {
        showError(productInput, true); 
    }


    //  Validate Company Name
    const companyInput = target.querySelector('input[name="company"]');
    const companyCriteria = /^[A-Za-z0-9\s&\-\.]+$/;

    if (companyInput.value !== "") {
        if (!companyCriteria.test(companyInput.value)) {
            isValid = false;
            showError(companyInput, false);
        } else {
            showError(companyInput, true);
        }
    }

    // for checkboxes
    const checkboxContainer = target.querySelector('.main_checkbox');
    const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
    let isChecked = false;

    checkboxes.forEach(box => {
        if (box.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        isValid = false;
       
        checkboxContainer.style.padding = "10px"; // Adding padding so color looks good
        checkboxContainer.style.borderRadius = "5px";
        showError(checkboxContainer, false); 
    } else {
        checkboxContainer.style.padding = "0"; 
        checkboxContainer.style.backgroundColor = "transparent"; 
    }

    // for message
    const messageInput = target.querySelector('textarea');
    
    if (messageInput.value.length < 10) {
        isValid = false;
        showError(messageInput, false);
    } else {
        showError(messageInput, true);
    }


    if (!isValid) {
        e.preventDefault(); 
       
        alert("Please fix the errors highlighted in red.");
    }   

    else{
        alert("Form submitted !");
        form.reset();
    }
   

  


});