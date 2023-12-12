let root = null;
const filePath = './jsonRooms.json';
function importRoom(){
// ดึงข้อมูล JSON 
fetch(filePath)
  .then(response => response.json())
  .then(jsonRooms => {
    for (const room of jsonRooms) {
        root = insert(root, room.ID, room.Status, "", room.Return);
        console.log(room.ID );
    }
  })
  .catch(error => console.error('Error fetching JSON:', error));
}
importRoom();

function displayAll() {
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = ""; // Clear previous results
  
    // Perform in-order traversal to display all nodes
    inOrderTraversal(root, outputElement);
}

function inOrderTraversal(node, outputElement) {
if (node) {
    inOrderTraversal(node.left, outputElement);
    const containerElement = document.createElement("div");
    // แยกสีห้อง
    const vacantData = node.data.filter(dataItem => dataItem.status === "ว่าง");
    const occupiedData = node.data.filter(dataItem => dataItem.status === "ไม่ว่าง");
    // "ว่าง"
    if (vacantData.length > 0) {
    const vacantElement = document.createElement("div");
    vacantElement.classList.add("result-item");
    vacantElement.innerHTML = `<strong>Key:</strong> ${node.key}<br> <strong>Status:</strong> ว่าง<br> <strong>Rental Date:</strong> ${vacantData[0].rentalDate}<br> <strong>Return Date:</strong> ${vacantData[0].returnDate}`;
    containerElement.appendChild(vacantElement);
    }

    // "ไม่ว่าง" 
    if (occupiedData.length > 0) {
    const occupiedElement = document.createElement("div");
    occupiedElement.classList.add("result-item", "occupied");
    occupiedElement.innerHTML = `<strong>Key:</strong> ${node.key}<br> <strong>Status:</strong> ไม่ว่าง<br> <strong>Rental Date:</strong> ${occupiedData[0].rentalDate}<br> <strong>Return Date:</strong> ${occupiedData[0].returnDate}`;
    containerElement.appendChild(occupiedElement);
    }

    outputElement.appendChild(containerElement);
    inOrderTraversal(node.right, outputElement);
}
}

function searchAndDisplay() {
  const searchInput = document.getElementById("searchInput");
  const keyToSearch = parseInt(searchInput.value, 10);

  if (!isNaN(keyToSearch)) {
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = "";
    displayDataById(root, keyToSearch);
  } else {
    alert("Please enter a valid numeric ID.");
  }
}

function showInsertPopup() {
    const insertPopup = document.getElementById("insertPopup");
    insertPopup.style.display = "flex";
  }
  
function closeInsertPopup() {
const insertPopup = document.getElementById("insertPopup");
insertPopup.style.display = "none";
}
  
function toggleReturnDateInput() {
const insertStatus = document.getElementById("insertStatus");
const insertRentalDate = document.getElementById("insertRentalDate");
const insertReturnDate = document.getElementById("insertReturnDate");

// Enable/disable input ของ data input
insertRentalDate.disabled = insertStatus.value === "ว่าง";
insertReturnDate.disabled = insertStatus.value === "ว่าง";

}
  
function insertData() {
const insertKey = document.getElementById("insertKey").value;
const insertStatus = document.getElementById("insertStatus").value;
const insertRentalDate = document.getElementById("insertRentalDate").value;
const insertReturnDate = document.getElementById("insertReturnDate").value;

if (insertKey && insertStatus) {
    const key = parseInt(insertKey, 10);
    if (!isNaN(key)) {
    root = deleteNode(root, key);
    root = insert(root, key, insertStatus, insertRentalDate, insertReturnDate);
    displayAll();
    closeInsertPopup();
    } else {
    alert("Please enter a valid numeric key.");
    }
} else {
    alert("Please fill in all required fields.");
}
}

  