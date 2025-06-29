// Datos y configuración
const genres = [
  "Acción",
  "Aventura",
  "RPG",
  "Estrategia",
  "Deportes",
  "Carreras",
  "Simulación",
  "Puzzle",
  "Terror",
  "Plataformas",
  "Shooter",
  "Indie",
  "Clicker",
]

const platforms = ["PlayStation", "Xbox", "PC", "Steam", "Epic Games"]

// Estado de la aplicación
let games = []
let customLists = []
let filteredGames = []
let currentView = "all"
let currentEditingGame = null
let sidebarOpen = true
let draggedElement = null
let draggedIndex = -1

// Elementos del DOM
const elements = {
  // Sidebar y toggle
  sidebar: document.getElementById("sidebar"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  sidebarOverlay: document.getElementById("sidebarOverlay"),
  mainContent: document.getElementById("mainContent"),

  // Navegación
  navLinks: document.querySelectorAll(".nav-link"),
  customListsContainer: document.getElementById("customLists"),

  // Header
  pageTitle: document.getElementById("pageTitle"),
  pageSubtitle: document.getElementById("pageSubtitle"),
  searchInput: document.getElementById("searchInput"),
  genreFilter: document.getElementById("genreFilter"),
  platformFilter: document.getElementById("platformFilter"),

  // Stats - RENOMBRADOS para evitar conflictos
  statsContainer: document.getElementById("statsContainer"),
  statsPlatinums: document.getElementById("statsPlatinums"),
  statsTotalHours: document.getElementById("statsTotalHours"),
  statsTotalAchievements: document.getElementById("statsTotalAchievements"),

  // Counts
  allGamesCount: document.getElementById("allGamesCount"),
  playingCount: document.getElementById("playingCount"),
  completedCount: document.getElementById("completedCount"),
  pausedCount: document.getElementById("pausedCount"),
  abandonedCount: document.getElementById("abandonedCount"),
  wishlistCount: document.getElementById("wishlistCount"),

  // Games
  gamesGrid: document.getElementById("gamesGrid"),
  emptyState: document.getElementById("emptyState"),

  // Modals
  gameModal: document.getElementById("gameModal"),
  listModal: document.getElementById("listModal"),
  modalTitle: document.getElementById("modalTitle"),
  submitBtnText: document.getElementById("submitBtnText"),

  // Forms - RENOMBRADOS para evitar conflictos
  gameForm: document.getElementById("gameForm"),
  listForm: document.getElementById("listForm"),
  gameTitle: document.getElementById("gameTitle"),
  gameSaga: document.getElementById("gameSaga"),
  gameGenre: document.getElementById("gameGenre"),
  gamePlatform: document.getElementById("gamePlatform"),
  gameStatus: document.getElementById("gameStatus"),
  gameHours: document.getElementById("gameHours"),
  formTotalAchievements: document.getElementById("formTotalAchievements"),
  formCompletedAchievements: document.getElementById("formCompletedAchievements"),
  gameRating: document.getElementById("gameRating"),
  platinumObtained: document.getElementById("platinumObtained"),
  gameList: document.getElementById("gameList"),
  gameNotes: document.getElementById("gameNotes"),
  listName: document.getElementById("listName"),
  listDescription: document.getElementById("listDescription"),

  // Import/Export
  importFile: document.getElementById("importFile"),
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  loadData()
  updateDisplay()
})

function initializeApp() {
  populateSelects()
  setupSidebar()
}

function setupSidebar() {
  elements.sidebarToggle.addEventListener("click", toggleSidebar)
  elements.sidebarOverlay.addEventListener("click", closeSidebar)

  // Cerrar sidebar al hacer clic fuera en móvil
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 1024 &&
      sidebarOpen &&
      !elements.sidebar.contains(e.target) &&
      !elements.sidebarToggle.contains(e.target)
    ) {
      closeSidebar()
    }
  })
}

function toggleSidebar() {
  if (sidebarOpen) {
    closeSidebar()
  } else {
    openSidebar()
  }
}

function openSidebar() {
  sidebarOpen = true
  elements.sidebar.classList.add("open")
  elements.sidebar.classList.remove("collapsed")
  elements.sidebarToggle.classList.add("active")

  // Mostrar overlay en móvil
  if (window.innerWidth <= 1024) {
    elements.sidebarOverlay.classList.add("active")
  }

  if (window.innerWidth > 1024) {
    elements.mainContent.classList.remove("expanded")
  }
}

function closeSidebar() {
  sidebarOpen = false
  elements.sidebar.classList.remove("open")
  elements.sidebar.classList.add("collapsed")
  elements.sidebarToggle.classList.remove("active")
  elements.sidebarOverlay.classList.remove("active")

  if (window.innerWidth > 1024) {
    elements.mainContent.classList.add("expanded")
  }
}

function populateSelects() {
  // Géneros
  genres.forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.textContent = genre
    elements.genreFilter.appendChild(option.cloneNode(true))
    elements.gameGenre.appendChild(option)
  })

  // Plataformas
  platforms.forEach((platform) => {
    const option = document.createElement("option")
    option.value = platform
    option.textContent = platform
    elements.platformFilter.appendChild(option.cloneNode(true))
    elements.gamePlatform.appendChild(option)
  })
}

function setupEventListeners() {
  // Navegación
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const view = link.dataset.view
      if (view) {
        switchView(view)
        // Cerrar sidebar en móvil después de seleccionar
        if (window.innerWidth <= 1024) {
          closeSidebar()
        }
      }
    })
  })

  // Filtros
  elements.searchInput.addEventListener("input", filterGames)
  elements.genreFilter.addEventListener("change", filterGames)
  elements.platformFilter.addEventListener("change", filterGames)

  // Formularios
  elements.gameForm.addEventListener("submit", handleGameSubmit)
  elements.listForm.addEventListener("submit", handleListSubmit)

  // Modals
  elements.gameModal.addEventListener("click", (e) => {
    if (e.target === elements.gameModal) closeGameModal()
  })

  elements.listModal.addEventListener("click", (e) => {
    if (e.target === elements.listModal) closeCreateListModal()
  })

  // Validación de logros - USANDO LOS NUEVOS IDs
  elements.formTotalAchievements.addEventListener("blur", validateAchievements)
  elements.formCompletedAchievements.addEventListener("blur", validateAchievements)

  // Cerrar modals con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeGameModal()
      closeCreateListModal()
      if (window.innerWidth <= 1024) {
        closeSidebar()
      }
    }
  })

  // Responsive
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      elements.sidebarOverlay.classList.remove("active")
      if (sidebarOpen) {
        elements.mainContent.classList.remove("expanded")
      } else {
        elements.mainContent.classList.add("expanded")
      }
    } else {
      elements.mainContent.classList.remove("expanded")
      if (sidebarOpen) {
        elements.sidebarOverlay.classList.add("active")
      }
    }
  })
}

function loadData() {
  // Cargar juegos
  const savedGames = localStorage.getItem("gameTracker_games")
  if (savedGames) {
    games = JSON.parse(savedGames)
  }

  // Cargar listas personalizadas
  const savedLists = localStorage.getItem("gameTracker_lists")
  if (savedLists) {
    customLists = JSON.parse(savedLists)
  }

  updateCustomLists()
  filterGames()
}

function saveData() {
  localStorage.setItem("gameTracker_games", JSON.stringify(games))
  localStorage.setItem("gameTracker_lists", JSON.stringify(customLists))
}

// Funciones de exportar/importar datos
function exportData() {
  const data = {
    games: games,
    customLists: customLists,
    exportDate: new Date().toISOString(),
    version: "1.0",
  }

  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(dataBlob)
  link.download = `gametracker-backup-${new Date().toISOString().split("T")[0]}.json`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Mostrar mensaje de éxito
  alert("✅ Datos exportados correctamente")
}

function triggerImport() {
  elements.importFile.click()
}

function importData(event) {
  const file = event.target.files[0]
  if (!file) return

  if (file.type !== "application/json") {
    alert("❌ Por favor selecciona un archivo JSON válido")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)

      // Validar estructura del JSON
      if (!data.games || !Array.isArray(data.games)) {
        throw new Error("Estructura de datos inválida: falta el array de juegos")
      }

      if (!data.customLists || !Array.isArray(data.customLists)) {
        throw new Error("Estructura de datos inválida: falta el array de listas personalizadas")
      }

      // Confirmar importación
      const confirmMessage =
        `¿Estás seguro de que quieres importar estos datos?\n\n` +
        `• ${data.games.length} juegos\n` +
        `• ${data.customLists.length} listas personalizadas\n\n` +
        `⚠️ Esto reemplazará todos tus datos actuales.`

      if (confirm(confirmMessage)) {
        // Importar datos
        games = data.games
        customLists = data.customLists

        // Guardar y actualizar
        saveData()
        updateCustomLists()
        filterGames()

        // Volver a la vista principal
        switchView("all")

        alert("✅ Datos importados correctamente")
      }
    } catch (error) {
      console.error("Error al importar datos:", error)
      alert(`❌ Error al importar datos: ${error.message}`)
    }
  }

  reader.readAsText(file)

  // Limpiar el input para permitir reimportar el mismo archivo
  event.target.value = ""
}

function switchView(view) {
  currentView = view

  // Actualizar navegación
  elements.navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.view === view)
  })

  // Actualizar título
  const titles = {
    all: "Todos los juegos",
    playing: "Jugando",
    completed: "Completados",
    paused: "Pausados",
    abandoned: "Abandonados",
    wishlist: "Lista de deseos",
  }

  if (view.startsWith("list_")) {
    const listId = view.replace("list_", "")
    const list = customLists.find((l) => l.id === listId)
    elements.pageTitle.textContent = list ? list.name : "Lista personalizada"
    elements.pageSubtitle.textContent = "Lista personalizada"
  } else {
    elements.pageTitle.textContent = titles[view] || view
    elements.pageSubtitle.textContent = "Gestiona tu biblioteca de videojuegos"
  }

  // Mostrar/ocultar estadísticas solo para "Todos los juegos"
  if (view === "all") {
    elements.statsContainer.classList.remove("hidden")
  } else {
    elements.statsContainer.classList.add("hidden")
  }

  filterGames()
}

function filterGames() {
  const searchTerm = elements.searchInput.value.toLowerCase()
  const genreFilter = elements.genreFilter.value
  const platformFilter = elements.platformFilter.value

  filteredGames = games.filter((game) => {
    // Filtro de búsqueda
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm) || (game.saga && game.saga.toLowerCase().includes(searchTerm))

    // Filtro de género
    const matchesGenre = genreFilter === "all" || game.genre === genreFilter

    // Filtro de plataforma
    const matchesPlatform = platformFilter === "all" || game.platform === platformFilter

    // Filtro de vista
    let matchesView = true
    if (currentView === "all") {
      matchesView = true
    } else if (currentView.startsWith("list_")) {
      const listId = currentView.replace("list_", "")
      matchesView = game.customList === listId
    } else {
      matchesView = game.status === currentView
    }

    return matchesSearch && matchesGenre && matchesPlatform && matchesView
  })

  updateDisplay()
}

function updateDisplay() {
  updateStats()
  updateCounts()
  updateGamesGrid()
}

function updateStats() {
  const library = games.filter((g) => g.status !== "wishlist")
  const platinums = library.filter((g) => g.platinumObtained).length
  const totalHours = library.reduce((sum, game) => sum + game.hoursPlayed, 0)
  const totalAchievements = library.reduce((sum, game) => sum + (game.totalAchievements || 0), 0)

  elements.statsPlatinums.textContent = platinums
  elements.statsTotalHours.textContent = totalHours
  elements.statsTotalAchievements.textContent = totalAchievements
}

function updateCounts() {
  elements.allGamesCount.textContent = games.length
  elements.playingCount.textContent = games.filter((g) => g.status === "playing").length
  elements.completedCount.textContent = games.filter((g) => g.status === "completed").length
  elements.pausedCount.textContent = games.filter((g) => g.status === "paused").length
  elements.abandonedCount.textContent = games.filter((g) => g.status === "abandoned").length
  elements.wishlistCount.textContent = games.filter((g) => g.status === "wishlist").length
}

function updateGamesGrid() {
  elements.gamesGrid.innerHTML = ""

  if (filteredGames.length === 0) {
    elements.emptyState.style.display = "block"
    elements.gamesGrid.style.display = "none"
  } else {
    elements.emptyState.style.display = "none"
    elements.gamesGrid.style.display = "grid"

    filteredGames.forEach((game) => {
      elements.gamesGrid.appendChild(createGameCard(game))
    })
  }
}

function createGameCard(game) {
  const card = document.createElement("div")
  card.className = "game-card"

  const achievementProgress =
    game.totalAchievements > 0 ? Math.round((game.completedAchievements / game.totalAchievements) * 100) : 0

  const statusLabels = {
    completed: "Completado",
    playing: "Jugando",
    paused: "Pausado",
    abandoned: "Abandonado",
    wishlist: "Lista de deseos",
  }

  const listName = game.customList ? customLists.find((l) => l.id === game.customList)?.name || "" : ""

  card.innerHTML = `
    <div class="game-card-header">
      <h3 class="game-card-title">${game.title}</h3>
      ${game.saga ? `<p class="game-card-saga">${game.saga}</p>` : ""}
      <div class="game-badges">
        ${game.genre ? `<span class="badge badge-genre">${game.genre}</span>` : ""}
        ${game.platform ? `<span class="badge badge-platform">${game.platform}</span>` : ""}
        <span class="badge badge-status badge-${game.status}">${statusLabels[game.status]}</span>
        ${listName ? `<span class="badge badge-genre">${listName}</span>` : ""}
      </div>
    </div>
    
    <div class="game-card-body">
      ${
        game.status !== "wishlist"
          ? `
        <div class="game-stats">
          <div class="game-stat">
            <span class="game-stat-icon">🕒</span>
            <span>${game.hoursPlayed}h jugadas</span>
          </div>
          ${
            game.platinumObtained
              ? `
            <div class="game-stat">
              <span class="game-stat-icon">🏆</span>
              <span>Platino obtenido</span>
            </div>
          `
              : ""
          }
        </div>
        
        ${
          game.totalAchievements > 0
            ? `
          <div class="achievement-progress">
            <div class="achievement-header">
              <span>Logros</span>
              <span>${game.completedAchievements}/${game.totalAchievements}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${achievementProgress}%"></div>
            </div>
            <p class="progress-text">${achievementProgress}% completado</p>
          </div>
        `
            : ""
        }
        
        ${
          game.rating > 0
            ? `
          <div class="game-rating">
            <span class="game-stat-icon">⭐</span>
            <span>${game.rating}/10 estrellas</span>
          </div>
        `
            : ""
        }
      `
          : ""
      }
      
      ${
        game.notes
          ? `
        <div class="game-notes">
          <p class="game-notes-title">Notas:</p>
          <p class="game-notes-text">${game.notes}</p>
        </div>
      `
          : ""
      }
    </div>
    
    <div class="game-actions">
      <button class="btn-edit" onclick="editGame('${game.id}')">
        ✏️ Editar
      </button>
      <button class="btn-delete" onclick="deleteGame('${game.id}')">
        🗑️ Eliminar
      </button>
    </div>
  `

  return card
}

function updateCustomLists() {
  elements.customListsContainer.innerHTML = ""
  elements.gameList.innerHTML = '<option value="">Sin lista</option>'

  customLists.forEach((list, index) => {
    // Añadir a navegación
    const listItem = document.createElement("li")
    listItem.className = "nav-item draggable"
    listItem.draggable = true
    listItem.dataset.listId = list.id
    listItem.dataset.index = index

    const gameCount = games.filter((g) => g.customList === list.id).length

    listItem.innerHTML = `
      <button class="nav-link" data-view="list_${list.id}">
        <span class="drag-handle">⋮⋮</span>
        <span class="nav-icon">📁</span>
        ${list.name}
        <span class="nav-count">${gameCount}</span>
      </button>
      <div class="list-controls">
        <button class="list-control-btn delete" onclick="deleteList('${list.id}')" title="Eliminar">×</button>
      </div>
    `

    // Eventos de drag & drop
    listItem.addEventListener("dragstart", handleDragStart)
    listItem.addEventListener("dragover", handleDragOver)
    listItem.addEventListener("drop", handleDrop)
    listItem.addEventListener("dragend", handleDragEnd)

    elements.customListsContainer.appendChild(listItem)

    // Añadir event listener para el nav-link
    const link = listItem.querySelector(".nav-link")
    link.addEventListener("click", (e) => {
      // Solo activar si no se está arrastrando
      if (!listItem.classList.contains("dragging")) {
        switchView(`list_${list.id}`)
        elements.pageTitle.textContent = list.name
        // Cerrar sidebar en móvil
        if (window.innerWidth <= 1024) {
          closeSidebar()
        }
      }
    })

    // Añadir a selector
    const option = document.createElement("option")
    option.value = list.id
    option.textContent = list.name
    elements.gameList.appendChild(option)
  })
}

// Funciones de Drag & Drop
function handleDragStart(e) {
  draggedElement = this
  draggedIndex = Number.parseInt(this.dataset.index)
  this.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
  e.dataTransfer.setData("text/html", this.outerHTML)
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }

  e.dataTransfer.dropEffect = "move"

  // Añadir indicador visual
  this.classList.add("drag-over")

  return false
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation()
  }

  if (draggedElement !== this) {
    const dropIndex = Number.parseInt(this.dataset.index)

    // Reordenar el array
    const draggedList = customLists[draggedIndex]
    customLists.splice(draggedIndex, 1)
    customLists.splice(dropIndex, 0, draggedList)

    // Guardar y actualizar
    saveData()
    updateCustomLists()
  }

  return false
}

function handleDragEnd(e) {
  // Limpiar clases
  const items = elements.customListsContainer.querySelectorAll(".nav-item")
  items.forEach((item) => {
    item.classList.remove("dragging", "drag-over")
  })

  draggedElement = null
  draggedIndex = -1
}

// Funciones para manejar listas
function deleteList(listId) {
  const list = customLists.find((l) => l.id === listId)
  if (!list) return

  if (confirm(`¿Estás seguro de que quieres eliminar la lista "${list.name}"?`)) {
    // Remover la lista de los juegos que la tengan asignada
    games.forEach((game) => {
      if (game.customList === listId) {
        game.customList = null
      }
    })

    // Eliminar la lista
    customLists = customLists.filter((l) => l.id !== listId)

    // Si estamos viendo la lista eliminada, cambiar a "Todos los juegos"
    if (currentView === `list_${listId}`) {
      switchView("all")
    }

    saveData()
    updateCustomLists()
    filterGames()
  }
}

// Funciones de modal
function openAddGameModal() {
  currentEditingGame = null
  elements.modalTitle.textContent = "Añadir nuevo juego"
  elements.submitBtnText.textContent = "Añadir juego"
  resetGameForm()
  elements.gameModal.classList.add("active")
}

function editGame(gameId) {
  const game = games.find((g) => g.id === gameId)
  if (!game) return

  currentEditingGame = game
  elements.modalTitle.textContent = "Editar juego"
  elements.submitBtnText.textContent = "Actualizar juego"

  // Llenar formulario - campos de texto
  elements.gameTitle.value = game.title
  elements.gameSaga.value = game.saga || ""
  elements.gameGenre.value = game.genre || ""
  elements.gamePlatform.value = game.platform || ""
  elements.gameStatus.value = game.status
  elements.platinumObtained.checked = game.platinumObtained
  elements.gameList.value = game.customList || ""
  elements.gameNotes.value = game.notes || ""

  // Campos numéricos - COMPLETAMENTE VACÍOS por defecto
  elements.gameHours.value = ""
  elements.formTotalAchievements.value = ""
  elements.formCompletedAchievements.value = ""
  elements.gameRating.value = ""

  // Solo llenar si tienen valores mayores a 0
  if (game.hoursPlayed > 0) {
    elements.gameHours.value = game.hoursPlayed.toString()
  }
  if (game.totalAchievements > 0) {
    elements.formTotalAchievements.value = game.totalAchievements.toString()
  }
  if (game.completedAchievements > 0) {
    elements.formCompletedAchievements.value = game.completedAchievements.toString()
  }
  if (game.rating > 0) {
    elements.gameRating.value = game.rating.toString()
  }

  elements.gameModal.classList.add("active")
}

function deleteGame(gameId) {
  const game = games.find((g) => g.id === gameId)
  if (!game) return

  if (confirm(`¿Estás seguro de que quieres eliminar "${game.title}"?`)) {
    games = games.filter((g) => g.id !== gameId)
    saveData()
    updateCustomLists()
    filterGames()
  }
}

function closeGameModal() {
  elements.gameModal.classList.remove("active")
  currentEditingGame = null
  resetGameForm()
}

function resetGameForm() {
  elements.gameForm.reset()
  // No establecer ningún valor por defecto, dejar todos los campos completamente vacíos
}

function handleGameSubmit(e) {
  e.preventDefault()

  // Función helper para convertir valores numéricos
  function getNumericValue(fieldValue) {
    const trimmed = fieldValue.trim()
    if (trimmed === "" || trimmed === null || trimmed === undefined) {
      return 0
    }
    const parsed = Number.parseInt(trimmed, 10)
    return isNaN(parsed) ? 0 : parsed
  }

  const gameData = {
    id: currentEditingGame ? currentEditingGame.id : Date.now().toString(),
    title: elements.gameTitle.value.trim(),
    saga: elements.gameSaga.value.trim(),
    genre: elements.gameGenre.value,
    platform: elements.gamePlatform.value,
    status: elements.gameStatus.value,
    hoursPlayed: getNumericValue(elements.gameHours.value),
    totalAchievements: getNumericValue(elements.formTotalAchievements.value),
    completedAchievements: getNumericValue(elements.formCompletedAchievements.value),
    rating: getNumericValue(elements.gameRating.value),
    platinumObtained: elements.platinumObtained.checked,
    customList: elements.gameList.value || null,
    notes: elements.gameNotes.value.trim(),
  }

  if (currentEditingGame) {
    const index = games.findIndex((g) => g.id === currentEditingGame.id)
    games[index] = gameData
  } else {
    games.push(gameData)
  }

  saveData()
  updateCustomLists()
  filterGames()
  closeGameModal()
}

function openCreateListModal() {
  elements.listModal.classList.add("active")
}

function closeCreateListModal() {
  elements.listModal.classList.remove("active")
  elements.listForm.reset()
}

function handleListSubmit(e) {
  e.preventDefault()

  const listName = elements.listName.value.trim()
  const listDescription = elements.listDescription.value.trim()

  if (!listName) return

  const listData = {
    id: Date.now().toString(),
    name: listName,
    description: listDescription,
  }

  customLists.push(listData)
  saveData()
  updateCustomLists()
  closeCreateListModal()
}

function validateAchievements() {
  const totalInput = elements.formTotalAchievements
  const completedInput = elements.formCompletedAchievements

  // Solo validar si los campos tienen contenido y no están vacíos
  if (totalInput.value.trim() !== "") {
    let total = Number.parseInt(totalInput.value, 10)
    if (isNaN(total) || total < 0) {
      total = 0
    }
    if (total > 10000) {
      total = 10000
    }
    totalInput.value = total.toString()
  }

  if (completedInput.value.trim() !== "") {
    let completed = Number.parseInt(completedInput.value, 10)
    if (isNaN(completed) || completed < 0) {
      completed = 0
    }
    if (completed > 10000) {
      completed = 10000
    }
    completedInput.value = completed.toString()
  }

  // Validar que completados no sea mayor que total (solo si ambos tienen valores)
  if (totalInput.value.trim() !== "" && completedInput.value.trim() !== "") {
    const finalTotal = Number.parseInt(totalInput.value, 10) || 0
    const finalCompleted = Number.parseInt(completedInput.value, 10) || 0

    if (finalCompleted > finalTotal && finalTotal > 0) {
      completedInput.value = finalTotal.toString()
    }
  }
}

// Funciones globales
window.openAddGameModal = openAddGameModal
window.editGame = editGame
window.deleteGame = deleteGame
window.closeGameModal = closeGameModal
window.openCreateListModal = openCreateListModal
window.closeCreateListModal = closeCreateListModal
window.deleteList = deleteList
window.exportData = exportData
window.triggerImport = triggerImport
window.importData = importData
