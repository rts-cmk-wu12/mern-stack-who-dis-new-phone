function NewPage() {


    function submitHandler(event) {
        event.preventDefault();
        const form = event.target
        const formData = new FormData(form)
        const formDataObject = Object.fromEntries(formData.entries())
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        }

        const response = fetch('/api/posts', fetchOptions)

        console.log(formDataObject);
    }
    
    


    return ( 
        <>
        <form onSubmit={submitHandler}>
            <input name="title" type="text" placeholder="Title" />
            <input type="date" name="published" />
            <textarea placeholder="Message" name="text"></textarea>
            <input type="submit" value="send"/>
        </form>
        </>
     );
}

export default NewPage;