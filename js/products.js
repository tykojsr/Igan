function fetchProductsDataFromLocalStorage() {
	const productsData = JSON.parse(
		sessionStorage.getItem("productsAndServicesData")
	);
	return productsData;
}

async function populateProductsContainer(productsData) {
	if (!productsData || !productsData.categories) {
		console.log("No product data available.");
		return;
	}

	const productsCaption = document.getElementById("ourProductsCaption");
	productsCaption.textContent = productsData.productCaption;

	const productContainer = document.getElementById("productContainer");
	productContainer.innerHTML = "";

	productsData.categories.forEach((category, categoryIndex) => {
		category.products.forEach((product, productIndex) => {
			const productCard = document.createElement("div");
			productCard.classList.add("col-lg-4", "col-md-6", "wow", "zoomIn");
			productCard.dataset.wowDelay = `${
				0.3 * (categoryIndex * category.products.length + productIndex + 1)
			}s`;

			const cardBody = document.createElement("div");
			cardBody.classList.add(
				"product-item",
				"bg-light",
				"rounded",
				"d-flex",
				"flex-column",
				"align-items-center",
				"justify-content-center",
				"text-center"
			);

			const productImage = document.createElement("img");
			productImage.src = product.imageUrl;
			productImage.style.width = "5cm";
			productImage.style.height = "5cm";
			productImage.style.objectFit = "cover";

			productImage.addEventListener("click", () => {
				const modal = new bootstrap.Modal(
					document.getElementById("imageModal")
				);
				const modalImage = document.getElementById("modalImage");
				modalImage.src = product.imageUrl;
				document.getElementById("imageModalLabel").innerHTML = product.title;
				modal.show();
			});

			cardBody.appendChild(productImage);

			const productTitle = document.createElement("h4");
			productTitle.classList.add("mb-3");
			productTitle.textContent = product.title;

			cardBody.appendChild(productTitle);

			const productDescription = document.createElement("p");
			productDescription.classList.add("m-0");
			productDescription.textContent = product.description;

			cardBody.appendChild(productDescription);

			const productLink = document.createElement("a");
			productLink.className = "btn btn-lg btn-primary rounded";
			productLink.setAttribute("href", "./contact.html");
			const linkIcon = document.createElement("i");
			linkIcon.className = "bi bi-arrow-right";
			productLink.appendChild(linkIcon);
			productLink.style.display = "none";

			cardBody.appendChild(productLink);

			cardBody.addEventListener("mouseenter", function () {
				productLink.style.display = "block";
			});

			cardBody.addEventListener("mouseleave", function () {
				productLink.style.display = "none";
			});

			productCard.appendChild(cardBody);

			productContainer.appendChild(productCard);
		});
	});
}

function populateCategories(productsData) {
	const categoryContainer = document.getElementById("categoryContainer");

	categoryContainer.innerHTML = "";

	const allProductsItem = document.createElement("div");
	allProductsItem.classList.add("btn", "btn-secondary", "btn-sm", "m-2");
	allProductsItem.textContent = "All Products";
	allProductsItem.addEventListener("click", () => {
		populateProductsContainer(productsData);
	});
	categoryContainer.appendChild(allProductsItem);

	productsData.categories.forEach((category) => {
		const categoryItem = document.createElement("button");
		categoryItem.classList.add("btn", "btn-secondary", "btn-sm", "m-2");
		categoryItem.textContent = category.name;
		categoryItem.addEventListener("click", () => {
			const categoryData = getCategoryDataByName(productsData, category.name);
			populateProductsContainer(categoryData);
			console.log(categoryData);
		});
		categoryContainer.appendChild(categoryItem);
	});
}

function getCategoryDataByName(productsData, categoryName) {
	const filteredCategories = productsData.categories.filter(
		(category) => category.name === categoryName
	);

	if (filteredCategories.length === 0) {
		console.log(`No category found with the name ${categoryName}.`);
		return null;
	}

	const filteredCategory = JSON.parse(JSON.stringify(filteredCategories[0]));
	filteredCategory.productCaption = `${categoryName}`;

	// Remove other categories from the filtered category
	filteredCategory.categories = [filteredCategory];

	return filteredCategory;
}
document.addEventListener("DOMContentLoaded", () => {
	const productsData = fetchProductsDataFromLocalStorage();
	populateProductsContainer(productsData);
	populateCategories(productsData);
});
