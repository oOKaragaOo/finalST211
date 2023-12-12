class AVLNode {
    constructor(key, status, rentalDate, returnDate) {
      this.key = key;
      this.data = [{ status, rentalDate, returnDate }]; //เก็บข้อมูลเป็น JS Obj.
      this.left = null;
      this.right = null;
      this.height = 1;
    }
  }
function insert(root, key, status, rentalDate, returnDate) {
    if (!root) {
      return new AVLNode(key, status, rentalDate, returnDate);
    }
    if (key < root.key) {
      root.left = insert(root.left, key, status, rentalDate, returnDate);
    } else if (key > root.key) {
      root.right = insert(root.right, key, status, rentalDate, returnDate);
    } else {
      root.data.push({ status, rentalDate, returnDate });
    }
    root.height = 1 + Math.max(getHeight(root.left), getHeight(root.right));
    //สมดุลของ AVL tree
    const balance = getBalance(root);
    if (balance > 1 && key < root.left.key) {
      return rotateRight(root);
    }
    if (balance < -1 && key > root.right.key) {
      return rotateLeft(root);
    }
    if (balance > 1 && key > root.left.key) {
      root.left = rotateLeft(root.left);
      return rotateRight(root);
    }
    if (balance < -1 && key < root.right.key) {
      root.right = rotateRight(root.right);
      return rotateLeft(root);
    }
    return root;
  }
  
  function rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
    x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
    return x;
  }
  function rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = 1 + Math.max(getHeight(x.left), getHeight(x.right));
    y.height = 1 + Math.max(getHeight(y.left), getHeight(y.right));
    return y;
  }
  
  function getHeight(node) {
    return node ? node.height : 0;
  }
  
  function getBalance(node) {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  }
  
  function searchById(root, key) {
    if (!root || root.key === key) {
      return root;
    }
  
    if (key < root.key) {
      return searchById(root.left, key);
    }
  
    return searchById(root.right, key);
  }
  
  function displayDataById(root, key) {
    const result = searchById(root, key);
    const outputElement = document.getElementById("output");
  
    if (result) {
      const containerElement = document.createElement("div");
      containerElement.classList.add("result-container");
  
      result.data.forEach(dataItem => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("result-item");
        itemElement.innerHTML = `<strong>Key:</strong> ${result.key}, <strong>Status:</strong> ${dataItem.status}, <strong>Rental Date:</strong> ${dataItem.rentalDate}, <strong>Return Date:</strong> ${dataItem.returnDate}`;
        containerElement.appendChild(itemElement);
      });
  
      outputElement.appendChild(containerElement);
    } else {
      outputElement.textContent = "ID not found";
    }
  }
  
  function inOrderTraversal(node, outputElement) {
    if (node) {
      inOrderTraversal(node.left, outputElement);
  
      const containerElement = document.createElement("div");
      containerElement.classList.add("result-container");
  
      node.data.forEach(dataItem => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("result-item");
        itemElement.innerHTML = `<strong>Key:</strong> ${node.key}, <strong>Status:</strong> ${dataItem.status}, <strong>Rental Date:</strong> ${dataItem.rentalDate}, <strong>Return Date:</strong> ${dataItem.returnDate}`;
        containerElement.appendChild(itemElement);
      });
  
      outputElement.appendChild(containerElement);
  
      inOrderTraversal(node.right, outputElement);
    }
  }
  function deleteNode(root, key) {
    if (!root) {
      return root;
    }
    if (key < root.key) {
      root.left = deleteNode(root.left, key);
    } else if (key > root.key) {
      root.right = deleteNode(root.right, key);
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.key = minValueNode(root.right);
      root.right = deleteNode(root.right, root.key);
    }
    // Update height of the current node
    root.height = 1 + Math.max(getHeight(root.left), getHeight(root.right));
    // Balance the node
    const balance = getBalance(root);
    // Left Left Case
    if (balance > 1 && getBalance(root.left) >= 0) {
      return rotateRight(root);
    }
    // Left Right Case
    if (balance > 1 && getBalance(root.left) < 0) {
      root.left = rotateLeft(root.left);
      return rotateRight(root);
    }
    // Right Right Case
    if (balance < -1 && getBalance(root.right) <= 0) {
      return rotateLeft(root);
    }
    // Right Left Case
    if (balance < -1 && getBalance(root.right) > 0) {
      root.right = rotateRight(root.right);
      return rotateLeft(root);
    }
  
    return root;
  }
  
  function minValueNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current.key;
  }
  