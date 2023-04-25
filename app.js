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
            const viewButtonElement = document.createElement('button');
            viewButtonElement.classList.add('bg-white','text-lg','hover:bg-green-500', 'text-green-500','border-2','border-green-500','hover:text-white', 'mx-2','font-bold', 'py-2', 'px-4', 'rounded','italic','font-serif' , 'focus:outline-none', 'focus:shadow-outline');
            viewButtonElement.innerText = 'View';
            viewButtonElement.addEventListener('click', () => {
                window.open(imageObject.url, '_blank');
            });
            const downloadButtonElement = document.createElement('button');
            downloadButtonElement.classList.add('bg-white','text-lg','hover:bg-yellow-500', 'text-yellow-500','border-2','border-yellow-500','hover:text-black', 'font-bold', 'mx-2', 'py-2', 'px-4', 'rounded','italic','font-serif' , 'focus:outline-none', 'focus:shadow-outline');
            downloadButtonElement.innerText = 'Download';
            downloadButtonElement.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = imageObject.url;
                link.download = `${inputElement.value}_${Date.now()}.jpg`;
                link.target = '_blank';
                document.body.appendChild(link);
                setTimeout(() => {
                    link.click();
                    document.body.removeChild(link);
                }, 1000);
            });
            cardFooter.appendChild(downloadButtonElement);
            cardFooter.appendChild(viewButtonElement);
            cardContainer.append(imageElement, cardBody, cardFooter);
            imageSection.append(cardContainer);
        })
    } catch (error){
        console.error(error);
    }
}

submitIcon.addEventListener('click',getImages);
