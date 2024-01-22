let params = new URLSearchParams(document.location.search);
let limit = params.get("limit") || 10;
let pg = params.get("page") || 1;
let sort = params.get("sort") || "desc"
let srch = params.get('search') || ''
let totalPages = parseInt(document.currentScript.getAttribute('total-pages'))
const recordLimit = document.getElementById('record-limit');
const sorted = document.getElementById('record-sort');
const search = document.getElementById('search-box');

if (!totalPages) {
    document.getElementById('prev-page').classList.add('visually-hidden');
    document.getElementById('next-page').classList.add('visually-hidden');
    document.getElementById('record-limit').classList.add('visually-hidden');
    document.getElementById('label-limit').classList.add('visually-hidden');
}
if (pg == null) {
    document.getElementById('page-link1').classList.add('active');
} else {
    document.getElementById('page-link' + pg).classList.add('active');
}

if (pg == null || pg == 1) {
    document.getElementById('prev-page').classList.add('disabled')
}
else {
    document.getElementById('prev-page').classList.remove('disabled')
};

if (pg == totalPages) {
    document.getElementById('next-page').classList.add('disabled')
} else {
    document.getElementById('next-page').classList.remove('disabled')
};
switch (parseInt(limit)) {
    case 5: document.getElementById('limit5').selected = 'selected'; break;
    case 10: document.getElementById('limit10').selected = 'selected'; break;
    case 25: document.getElementById('limit25').selected = 'selected'; break;
    case 50: document.getElementById('limit50').selected = 'selected'; break;
    case 100: document.getElementById('limit100').selected = 'selected'; break;
    default: document.getElementById('limit10').selected = 'selected'; break;

}
switch (sort) {
    case "asc": document.getElementById('sortAsc').selected = 'selected'; break;
    case "desc": document.getElementById('sortDesc').selected = 'selected'; break;
    default: document.getElementById('sortDesc').selected = 'selected'; break;

}


function setLimit() {
    window.location.search = "?page=1&limit=" + recordLimit.value + "&sort=" + sort + "&search=" + srch;
}
function setPage(page) {
    window.location.search = "?page=" + page + "&limit=" + limit + "&sort=" + sort + "&search=" + srch;

} function setSort() {
    window.location.search = "?page=" + pg + "&limit=" + limit + "&sort=" + sorted.value + "&search=" + srch;
}

function setSearch() {
    window.location.search = "?page=" + pg + "&limit=" + limit + "&sort=" + sort + "&search=" + search.value;
}
function prevPage() {
    currPg = parseInt(pg)
    if (currPg == 1) return;
    window.location.search = "?page=" + (currPg - 1) + "&limit=" + limit + "&sort=" + sort + "&search=" + srch;
}
function nextPage() {
    currPg = parseInt(pg) || 1;
    if (currPg == totalPages) return;
    window.location.search = "?page=" + (currPg + 1) + "&limit=" + limit + "&sort=" + sort + "&search=" + srch;
}