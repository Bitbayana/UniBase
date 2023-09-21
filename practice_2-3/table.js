document.addEventListener("DOMContentLoaded", function () {
    const dataTable = document.getElementById("data-table").getElementsByTagName("tbody")[0];
    const searchInput = document.getElementById("search");
    let data = []; // Для хранения исходных данных

    // Функция для выполнения запроса к API
    function fetchData() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(responseData => {
                data = responseData; // Сохраняем данные для сортировки и фильтрации
                renderTable(data);
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }

    // Функция для отображения данных в таблице
    function renderTable(dataArray) {
        dataTable.innerHTML = "";

        dataArray.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>${item.userId}</td>
                        <td>${item.id}</td>
                        <td>${item.title}</td>
                        <td>${item.body}</td>
                    `;
            dataTable.appendChild(row);
        });
    }
    const sortOrders = {
        userId: 1,
        id: 1,
        title: 1,
        body: 1,
    };

    // Функция для сортировки данных
    function sortData(columnName) {
        // Определите порядок сортировки для данного столбца
        const sortOrder = sortOrders[columnName];
        const sortedData = [...data].sort((a, b) => {
            if (a[columnName] < b[columnName]) return -1 * sortOrder;
            if (a[columnName] > b[columnName]) return 1 * sortOrder;
            return 0;
        });

        // Измените порядок сортировки для следующего клика
        sortOrders[columnName] *= -1;

        renderTable(sortedData);
    }

    // Функция для обработки событий при клике на заголовок столбца
    function handleSortClick(event) {
        const columnName = event.target.getAttribute("data-sort-by");
        sortData(columnName);
    }

    // Обработка событий для сортировки
    document.querySelectorAll("th").forEach(header => {
        header.addEventListener("click", handleSortClick);
    });

    // Обработка события для фильтрации
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        // Если введено менее 3 символов, не выполнять фильтрацию
        if (searchValue.length < 3) {
            renderTable(data);
            return;
        }
        const filteredData = data.filter(item => {
            return (
                item.userId.toString().includes(searchValue) ||
                item.id.toString().includes(searchValue) ||
                item.title.toLowerCase().includes(searchValue) ||
                item.body.toLowerCase().includes(searchValue)
            );
        });

        renderTable(filteredData);
    });

    // Вызываем функцию fetchData для получения данных
    fetchData();
});