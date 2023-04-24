const API_KEY = "YOUR_API_KEY";

const submitIcon = document.getElementById("submit");

const inputElement = document.querySelector("input");

const imageSection = document.querySelector('#image-section');

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            Authorization:`Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n:4,
            size: "1024x1024"
        })
    }
    try{
        console.log("Clicked");
        const response = await fetch('https://api.openai.com/v1/images/generations',options);
        const data = await response.json();
        // console.log(data);
        data?.data.forEach(imageObject => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('max-w-sm', 'rounded', 'overflow-hidden', 'shadow-lg', 'my-4');
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src',imageObject.url)
            imageElement.classList.add('w-full');
            const cardBody = document.createElement('div');
            cardBody.classList.add('px-6', 'py-4');
            const cardTitle = document.createElement('div');
            cardTitle.classList.add('font-bold', 'text-xl', 'mb-2');
            cardTitle.innerText = inputElement.value;
            const cardFooter = document.createElement('div');
            cardFooter.classList.add('px-6', 'py-4', 'text-center');
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('bg-green-500','text-3xl','hover:bg-red-900', 'text-white','border-lg','border-green-700','hover:text-black', 'font-bold', 'py-2', 'px-4', 'rounded','italic','font-serif' , 'focus:outline-none', 'focus:shadow-outline');
            buttonElement.innerText = 'View';
            buttonElement.addEventListener('click', () => {
                window.open(imageObject.url, '_blank');
            });
            cardFooter.appendChild(buttonElement);
            cardContainer.append(imageElement, cardBody, cardFooter);
            imageSection.append(cardContainer);
        })
    } catch (error){
        console.error(error);
    }
}

submitIcon.addEventListener('click',getImages);
