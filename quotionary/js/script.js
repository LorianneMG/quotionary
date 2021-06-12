// Save Quote
const saveQuote = (e) => {
    const quotecontent = document.querySelector('#quote').value
    const author = document.querySelector('#author').value
    const randomNum = Math.floor(Math.random() * 100)

    console.log(randomNum)
    // if (!validateForm(quote, author)) {
    //     return false
    // }

    const quote = {
        text: quotecontent,
        author: author,
        id: randomNum
    }

    // Test if quotes is null
    if (localStorage.getItem("quotes") === null) {
        // Init array
        const quotes = []
        // Add to array
        quotes.push(quote)
        // Set to localStorage
        localStorage.setItem("quotes", JSON.stringify(quotes))
    } else {
        // Get quotes from localStorage
        const quotes = JSON.parse(localStorage.getItem("quotes"))
        // Add quote to array
        quotes.push(quote)
        // Re-set back to localStorage
        localStorage.setItem("quotes", JSON.stringify(quotes))
    }

    // Clear form
    document.querySelector("#myForm").reset()

    // Re-fetch quotes
    fetchQuotes()

    // Prevent form from submitting
    e.preventDefault()
}

// Delete quote
const deleteQuote = (id) => {
    // Get quotes from localStorage
    const quotes = JSON.parse(localStorage.getItem("quotes"))
    // Loop through the quotes
    for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].id == id) {
            // Remove from array
            quotes.splice(i, 1)
        }
    }
    // Re-set back to localStorage
    localStorage.setItem("quotes", JSON.stringify(quotes))

    // Re-fetch quotes
    fetchQuotes()
}

// Fetch quotes
const fetchQuotes = () => {
    // Get quotes from localStorage
    const quotes = JSON.parse(localStorage.getItem("quotes"))
    const quotesResults = document.querySelector("#quotesResults")

    // Build output
    quotesResults.innerHTML = ""

    for (let i = 0; i < quotes.length; i++) {
        let text = quotes[i].text
        let author = quotes[i].author
        let id = quotes[i].id
        quotesResults.innerHTML +=
            `<figure class="well pb-2 border-bottom border-secondary">
        <blockquote class="blockquote">
        <p>"${text}"</p>
        </blockquote>
        <figcaption class="blockquote-footer">
        ${author}
        </figcaption>
        <a onclick="deleteQuote(${id})" class="btn btn-danger" href="#">Delete</a> 
    </figure>`
    }
}
// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveQuote)

fetchQuotes()
