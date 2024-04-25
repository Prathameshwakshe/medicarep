document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('medicine-form');
    const medicineList = document.getElementById('medicines');
  
    // Load medicines from local storage when the page loads
    loadMedicines();
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nameInput = document.getElementById('medicine-name');
      const quantityInput = document.getElementById('medicine-quantity');
  
      const name = nameInput.value.trim();
      const quantity = parseInt(quantityInput.value);
  
      if (name === '' || isNaN(quantity) || quantity <= 0) {
        alert('Please enter valid data.');
        return;
      }
  
      addMedicine(name, quantity);
  
      // Save medicines to local storage
      saveMedicines();
  
      nameInput.value = '';
      quantityInput.value = '';
    });
  
    function addMedicine(name, quantity) {
      const li = document.createElement('li');
      li.textContent = `${name} - Quantity: ${quantity}`;
      medicineList.appendChild(li);
    }
  
    function saveMedicines() {
      const medicines = [];
      const lis = document.querySelectorAll('#medicines li');
      lis.forEach(li => {
        medicines.push(li.textContent);
      });
      localStorage.setItem('medicines', JSON.stringify(medicines));
    }
  
    function loadMedicines() {
      const medicines = JSON.parse(localStorage.getItem('medicines')) || [];
      medicines.forEach(medicine => {
        const li = document.createElement('li');
        li.textContent = medicine;
        medicineList.appendChild(li);
      });
    }
  });
  