// Configuración de géneros para cada tipo de contenido
const contentGenres = {
  games: [
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
  ],
  movies: [
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Fantasía",
    "Romance",
    "Thriller",
    "Documental",
    "Animación",
    "Musical",
  ],
  series: [
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Fantasía",
    "Romance",
    "Thriller",
    "Documental",
    "Animación",
    "Musical",
    "Reality",
  ],
  animes: [
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Kodomomuke",
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Romance",
    "Fantasía",
    "Ciencia Ficción",
    "Terror",
    "Slice of Life",
  ],
  libros: [
    "Ficción",
    "No Ficción",
    "Fantasía",
    "Ciencia Ficción",
    "Romance",
    "Misterio",
    "Thriller",
    "Terror",
    "Biografía",
    "Historia",
    "Autoayuda",
    "Ensayo",
  ],
  mangas: [
    "Shonen",
    "Shojo",
    "Seinen",
    "Josei",
    "Kodomomuke",
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Romance",
    "Fantasía",
    "Ciencia Ficción",
    "Terror",
    "Slice of Life",
  ],
  novelas: [
    "Ficción",
    "Fantasía",
    "Ciencia Ficción",
    "Romance",
    "Misterio",
    "Thriller",
    "Terror",
    "Histórica",
    "Contemporánea",
    "Clásica",
    "Aventura",
    "Drama",
  ],
}

const platforms = ["PlayStation", "Xbox", "PC", "Steam", "Epic Games", "Nintendo Switch"]

// Configuración de secciones con estadísticas
const sectionsConfig = [
  {
    id: "games",
    title: "🎮 Juegos",
    icon: "🎮",
    subsections: [
      { id: "games-all", title: "Todos los juegos", icon: "📚", countKey: "allGamesCount" },
      { id: "games-playing", title: "Jugando", icon: "🎯", countKey: "playingCount" },
      { id: "games-completed", title: "Completados", icon: "✅", countKey: "completedCount" },
      { id: "games-paused", title: "Pausados", icon: "⏸️", countKey: "pausedCount" },
      { id: "games-abandoned", title: "Abandonados", icon: "🚫", countKey: "abandonedCount" },
      { id: "games-wishlist", title: "Lista de deseos", icon: "⭐", countKey: "wishlistCount" },
    ],
  },
  {
    id: "tvshows",
    title: "📺 TV Shows",
    icon: "📺",
    subsections: [
      { id: "movies", title: "Películas", icon: "🎬", countKey: "moviesCount" },
      { id: "series", title: "Series", icon: "📺", countKey: "seriesCount" },
      { id: "animes", title: "Animes", icon: "🍥", countKey: "animesCount" },
    ],
  },
  {
    id: "lectura",
    title: "📚 Lectura",
    icon: "📚",
    subsections: [
      { id: "libros", title: "Libros", icon: "📖", countKey: "librosCount" },
      { id: "mangas", title: "Mangas", icon: "📚", countKey: "mangasCount" },
      { id: "novelas", title: "Novelas", icon: "🧠", countKey: "novelasCount" },
    ],
  },
]

// Ejemplos contextuales para las listas
const listExamples = {
  games: ["Resident Evil Collection", "Juegos de Terror", "RPGs Favoritos"],
  tvshows: ["Películas de Marvel", "Series de Netflix", "Animes de Shonen"],
  lectura: ["Novelas de Fantasía", "Mangas de Acción", "Libros de Ciencia Ficción"],
}

// Estado de la aplicación
let appData = {
  juegos: [],
  tvshows: { peliculas: [], series: [], animes: [] },
  lectura: { libros: [], mangas: [], novelas: [] },
}

let customLists = {
  games: [],
  tvshows: [],
  lectura: [],
}

let sectionOrder = ["games", "tvshows", "lectura"]
let expandedSections = ["games", "tvshows", "lectura"]
let filteredContent = []
let currentView = "games-all"
let currentEditingItem = null
let currentContentType = "games"
let currentEditingSectionId = null
let sidebarOpen = true

// Variables para drag & drop
let draggedSection = null
let draggedSectionIndex = -1
let draggedSubsection = null
let draggedSubsectionIndex = -1
let draggedList = null
let draggedListIndex = -1

// Elementos del DOM
const elements = {
  sidebar: document.getElementById("sidebar"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  sidebarOverlay: document.getElementById("sidebarOverlay"),
  mainContent: document.getElementById("mainContent"),
  sidebarNav: document.getElementById("sidebarNav"),
  pageTitle: document.getElementById("pageTitle"),
  pageSubtitle: document.getElementById("pageSubtitle"),
  searchInput: document.getElementById("searchInput"),
  genreFilter: document.getElementById("genreFilter"),
  statusFilter: document.getElementById("statusFilter"),
  addItemBtn: document.getElementById("addItemBtn"),
  statsContainer: document.getElementById("statsContainer"),
  statsPlatinums: document.getElementById("statsPlatinums"),
  statsTotalHours: document.getElementById("statsTotalHours"),
  statsTotalAchievements: document.getElementById("statsTotalAchievements"),
  contentGrid: document.getElementById("contentGrid"),
  emptyState: document.getElementById("emptyState"),
  gameModal: document.getElementById("gameModal"),
  mediaModal: document.getElementById("mediaModal"),
  listModal: document.getElementById("listModal"),
  gameForm: document.getElementById("gameForm"),
  gameModalTitle: document.getElementById("gameModalTitle"),
  gameTitle: document.getElementById("gameTitle"),
  gameSaga: document.getElementById("gameSaga"),
  gameGenre: document.getElementById("gameGenre"),
  gamePlatform: document.getElementById("gamePlatform"),
  gameStatus: document.getElementById("gameStatus"),
  gameHours: document.getElementById("gameHours"),
  gameTotalAchievements: document.getElementById("gameTotalAchievements"),
  gameCompletedAchievements: document.getElementById("gameCompletedAchievements"),
  gameRating: document.getElementById("gameRating"),
  platinumObtained: document.getElementById("platinumObtained"),
  gameList: document.getElementById("gameList"),
  gameNotes: document.getElementById("gameNotes"),
  gameSubmitBtnText: document.getElementById("gameSubmitBtnText"),
  mediaForm: document.getElementById("mediaForm"),
  mediaModalTitle: document.getElementById("mediaModalTitle"),
  mediaTitle: document.getElementById("mediaTitle"),
  mediaGenre: document.getElementById("mediaGenre"),
  mediaStatus: document.getElementById("mediaStatus"),
  mediaRating: document.getElementById("mediaRating"),
  mediaSeason: document.getElementById("mediaSeason"),
  mediaEpisode: document.getElementById("mediaEpisode"),
  mediaChapter: document.getElementById("mediaChapter"),
  mediaComment: document.getElementById("mediaComment"),
  mediaSubmitBtnText: document.getElementById("mediaSubmitBtnText"),
  seasonGroup: document.getElementById("seasonGroup"),
  episodeGroup: document.getElementById("episodeGroup"),
  chapterGroup: document.getElementById("chapterGroup"),
  listForm: document.getElementById("listForm"),
  listName: document.getElementById("listName"),
  listDescription: document.getElementById("listDescription"),
  importFile: document.getElementById("importFile"),
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  loadData()
  renderSidebar()
  updateDisplay()
})

function initializeApp() {
  populateSelects()
  setupSidebar()
}

function setupSidebar() {
  elements.sidebarToggle.addEventListener("click", toggleSidebar)
  elements.sidebarOverlay.addEventListener("click", closeSidebar)

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
  contentGenres.games.forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.textContent = genre
    elements.gameGenre.appendChild(option)
  })

  platforms.forEach((platform) => {
    const option = document.createElement("option")
    option.value = platform
    option.textContent = platform
    elements.gamePlatform.appendChild(option)
  })
}

function renderSidebar() {
  elements.sidebarNav.innerHTML = ""

  sectionOrder.forEach((sectionId, index) => {
    const sectionConfig = sectionsConfig.find((s) => s.id === sectionId)
    if (!sectionConfig) return

    const sectionContainer = document.createElement("div")
    sectionContainer.className = "section-container"
    sectionContainer.draggable = true
    sectionContainer.dataset.sectionId = sectionId
    sectionContainer.dataset.index = index

    const isExpanded = expandedSections.includes(sectionId)
    const totalCount = getTotalSectionCount(sectionId)

    sectionContainer.innerHTML = `
      <div class="section-header ${isExpanded ? "active" : ""}" onclick="toggleSection('${sectionId}')">
        <span class="section-drag-handle" onclick="event.stopPropagation()">⋮⋮</span>
        <div class="section-info">
          <span class="section-icon">${sectionConfig.icon}</span>
          <span class="section-title">${sectionConfig.title}</span>
        </div>
        <span class="section-count">${totalCount}</span>
        <button class="section-toggle ${isExpanded ? "expanded" : ""}" onclick="event.stopPropagation(); toggleSection('${sectionId}')">▶</button>
      </div>
      <div class="section-content ${isExpanded ? "expanded" : ""}">
        <ul class="section-nav-list" id="subsections-${sectionId}">
          ${sectionConfig.subsections
            .map(
              (sub, subIndex) => `
            <li class="section-nav-item draggable" draggable="true" data-subsection-id="${sub.id}" data-section="${sectionId}" data-index="${subIndex}">
              <button class="section-nav-link ${currentView === sub.id ? "active" : ""}" data-view="${sub.id}">
                <span class="section-nav-drag-handle" onclick="event.stopPropagation()">⋮⋮</span>
                <span class="section-nav-icon">${sub.icon}</span>
                ${sub.title}
                ${sub.countKey ? `<span class="section-nav-count" id="${sub.countKey}">0</span>` : ""}
              </button>
            </li>
          `,
            )
            .join("")}
        </ul>
        ${renderSectionLists(sectionId)}
      </div>
    `

    // Event listeners para drag & drop de secciones
    sectionContainer.addEventListener("dragstart", handleSectionDragStart)
    sectionContainer.addEventListener("dragover", handleSectionDragOver)
    sectionContainer.addEventListener("drop", handleSectionDrop)
    sectionContainer.addEventListener("dragend", handleSectionDragEnd)

    // Event listeners para navegación
    const navLinks = sectionContainer.querySelectorAll(".section-nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const view = link.dataset.view
        if (view) {
          switchView(view)
          if (window.innerWidth <= 1024) {
            closeSidebar()
          }
        }
      })
    })

    // Event listeners para drag & drop de subsecciones
    const subsectionItems = sectionContainer.querySelectorAll(".section-nav-item")
    subsectionItems.forEach((item) => {
      item.addEventListener("dragstart", handleSubsectionDragStart)
      item.addEventListener("dragover", handleSubsectionDragOver)
      item.addEventListener("drop", handleSubsectionDrop)
      item.addEventListener("dragend", handleSubsectionDragEnd)
    })

    // Event listeners para drag & drop de listas
    const listItems = sectionContainer.querySelectorAll(".section-list-item")
    listItems.forEach((item) => {
      item.addEventListener("dragstart", handleListDragStart)
      item.addEventListener("dragover", handleListDragOver)
      item.addEventListener("drop", handleListDrop)
      item.addEventListener("dragend", handleListDragEnd)

      const listLink = item.querySelector(".section-list-link")
      listLink.addEventListener("click", () => {
        const view = listLink.dataset.view
        if (view) {
          switchView(view)
          if (window.innerWidth <= 1024) {
            closeSidebar()
          }
        }
      })
    })

    elements.sidebarNav.appendChild(sectionContainer)
  })
}

function renderSectionLists(sectionId) {
  const lists = customLists[sectionId] || []
  if (lists.length === 0) {
    return `
      <div class="section-lists">
        <div class="section-lists-header">
          <span class="section-lists-title">Mis Listas</span>
          <button class="btn-add-section-list" onclick="openCreateSectionListModal('${sectionId}')">+</button>
        </div>
      </div>
    `
  }

  return `
    <div class="section-lists">
      <div class="section-lists-header">
        <span class="section-lists-title">Mis Listas</span>
        <button class="btn-add-section-list" onclick="openCreateSectionListModal('${sectionId}')">+</button>
      </div>
      <ul class="section-custom-lists" id="customLists-${sectionId}">
        ${lists
          .map(
            (list, index) => `
          <li class="section-list-item draggable" draggable="true" data-list-id="${list.id}" data-section="${sectionId}" data-index="${index}">
            <button class="section-list-link ${currentView === `list_${sectionId}_${list.id}` ? "active" : ""}" data-view="list_${sectionId}_${list.id}">
              <span class="section-list-drag-handle" onclick="event.stopPropagation()">⋮⋮</span>
              <span class="section-list-icon">📁</span>
              <span class="section-list-name">${list.name}</span>
              <span class="section-list-count">${getSectionListCount(sectionId, list.id)}</span>
            </button>
            <div class="section-list-controls">
              <button class="section-list-control-btn delete" onclick="deleteSectionList('${sectionId}', '${list.id}')" title="Eliminar">×</button>
            </div>
          </li>
        `,
          )
          .join("")}
      </ul>
    </div>
  `
}

// Drag & Drop para secciones
function handleSectionDragStart(e) {
  draggedSection = this
  draggedSectionIndex = Number.parseInt(this.dataset.index)
  this.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
}

function handleSectionDragOver(e) {
  if (e.preventDefault) e.preventDefault()
  e.dataTransfer.dropEffect = "move"
  this.classList.add("drag-over")
  return false
}

function handleSectionDrop(e) {
  if (e.stopPropagation) e.stopPropagation()

  if (draggedSection !== this) {
    const dropIndex = Number.parseInt(this.dataset.index)
    const draggedSectionId = sectionOrder[draggedSectionIndex]

    sectionOrder.splice(draggedSectionIndex, 1)
    sectionOrder.splice(dropIndex, 0, draggedSectionId)

    saveUIState()
    renderSidebar()
    updateCounts()
  }
  return false
}

function handleSectionDragEnd(e) {
  const sections = elements.sidebarNav.querySelectorAll(".section-container")
  sections.forEach((section) => {
    section.classList.remove("dragging", "drag-over")
  })
  draggedSection = null
  draggedSectionIndex = -1
}

// Drag & Drop para subsecciones
function handleSubsectionDragStart(e) {
  draggedSubsection = this
  draggedSubsectionIndex = Number.parseInt(this.dataset.index)
  this.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
  e.stopPropagation()
}

function handleSubsectionDragOver(e) {
  if (e.preventDefault) e.preventDefault()
  e.dataTransfer.dropEffect = "move"
  this.classList.add("drag-over")
  e.stopPropagation()
  return false
}

function handleSubsectionDrop(e) {
  if (e.stopPropagation) e.stopPropagation()

  if (draggedSubsection !== this && draggedSubsection.dataset.section === this.dataset.section) {
    const dropIndex = Number.parseInt(this.dataset.index)
    const sectionId = this.dataset.section
    const sectionConfig = sectionsConfig.find((s) => s.id === sectionId)

    if (sectionConfig) {
      const draggedSubsectionData = sectionConfig.subsections[draggedSubsectionIndex]
      sectionConfig.subsections.splice(draggedSubsectionIndex, 1)
      sectionConfig.subsections.splice(dropIndex, 0, draggedSubsectionData)

      renderSidebar()
      updateCounts()
    }
  }
  return false
}

function handleSubsectionDragEnd(e) {
  const subsections = document.querySelectorAll(".section-nav-item")
  subsections.forEach((item) => {
    item.classList.remove("dragging", "drag-over")
  })
  draggedSubsection = null
  draggedSubsectionIndex = -1
}

// Drag & Drop para listas
function handleListDragStart(e) {
  draggedList = this
  draggedListIndex = Number.parseInt(this.dataset.index)
  this.classList.add("dragging")
  e.dataTransfer.effectAllowed = "move"
  e.stopPropagation()
}

function handleListDragOver(e) {
  if (e.preventDefault) e.preventDefault()
  e.dataTransfer.dropEffect = "move"
  this.classList.add("drag-over")
  e.stopPropagation()
  return false
}

function handleListDrop(e) {
  if (e.stopPropagation) e.stopPropagation()

  if (draggedList !== this && draggedList.dataset.section === this.dataset.section) {
    const dropIndex = Number.parseInt(this.dataset.index)
    const sectionId = this.dataset.section
    const draggedListData = customLists[sectionId][draggedListIndex]

    customLists[sectionId].splice(draggedListIndex, 1)
    customLists[sectionId].splice(dropIndex, 0, draggedListData)

    saveData()
    renderSidebar()
    updateCounts()
  }
  return false
}

function handleListDragEnd(e) {
  const lists = document.querySelectorAll(".section-list-item")
  lists.forEach((item) => {
    item.classList.remove("dragging", "drag-over")
  })
  draggedList = null
  draggedListIndex = -1
}

function getTotalSectionCount(sectionId) {
  switch (sectionId) {
    case "games":
      return appData.juegos.length
    case "tvshows":
      return appData.tvshows.peliculas.length + appData.tvshows.series.length + appData.tvshows.animes.length
    case "lectura":
      return appData.lectura.libros.length + appData.lectura.mangas.length + appData.lectura.novelas.length
    default:
      return 0
  }
}

function getSectionListCount(sectionId, listId) {
  switch (sectionId) {
    case "games":
      return appData.juegos.filter((item) => item.customList === listId).length
    case "tvshows":
      return [...appData.tvshows.peliculas, ...appData.tvshows.series, ...appData.tvshows.animes].filter(
        (item) => item.customList === listId,
      ).length
    case "lectura":
      return [...appData.lectura.libros, ...appData.lectura.mangas, ...appData.lectura.novelas].filter(
        (item) => item.customList === listId,
      ).length
    default:
      return 0
  }
}

function toggleSection(sectionId) {
  const index = expandedSections.indexOf(sectionId)
  if (index > -1) {
    expandedSections.splice(index, 1)
  } else {
    expandedSections.push(sectionId)
  }

  saveUIState()
  renderSidebar()
  updateCounts()
}

function setupEventListeners() {
  // Filtros
  elements.searchInput.addEventListener("input", filterContent)
  elements.genreFilter.addEventListener("change", filterContent)
  elements.statusFilter.addEventListener("change", filterContent)

  // Formularios
  elements.gameForm.addEventListener("submit", handleGameSubmit)
  elements.mediaForm.addEventListener("submit", handleMediaSubmit)
  elements.listForm.addEventListener("submit", handleListSubmit)

  // Modals
  elements.gameModal.addEventListener("click", (e) => {
    if (e.target === elements.gameModal) closeGameModal()
  })

  elements.mediaModal.addEventListener("click", (e) => {
    if (e.target === elements.mediaModal) closeMediaModal()
  })

  elements.listModal.addEventListener("click", (e) => {
    if (e.target === elements.listModal) closeCreateListModal()
  })

  // Validación de logros
  elements.gameTotalAchievements.addEventListener("blur", validateAchievements)
  elements.gameCompletedAchievements.addEventListener("blur", validateAchievements)

  // Cerrar modals con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeGameModal()
      closeMediaModal()
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
  // Cargar datos principales
  const savedData = localStorage.getItem("hobbyTracker_data")
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      appData = {
        juegos: parsedData.juegos || [],
        tvshows: {
          peliculas: parsedData.tvshows?.peliculas || [],
          series: parsedData.tvshows?.series || [],
          animes: parsedData.tvshows?.animes || [],
        },
        lectura: {
          libros: parsedData.lectura?.libros || [],
          mangas: parsedData.lectura?.mangas || [],
          novelas: parsedData.lectura?.novelas || [],
        },
      }
    } catch (error) {
      console.error("Error al cargar datos:", error)
    }
  }

  // Cargar listas personalizadas
  const savedLists = localStorage.getItem("hobbyTracker_lists")
  if (savedLists) {
    try {
      const parsedLists = JSON.parse(savedLists)
      customLists = {
        games: parsedLists.games || [],
        tvshows: parsedLists.tvshows || [],
        lectura: parsedLists.lectura || [],
      }
    } catch (error) {
      console.error("Error al cargar listas:", error)
    }
  }

  // Cargar estado de UI
  loadUIState()
  filterContent()
}

function saveData() {
  localStorage.setItem("hobbyTracker_data", JSON.stringify(appData))
  localStorage.setItem("hobbyTracker_lists", JSON.stringify(customLists))
}

function loadUIState() {
  const savedUIState = localStorage.getItem("hobbyTracker_uiState")
  if (savedUIState) {
    try {
      const uiState = JSON.parse(savedUIState)
      sectionOrder = uiState.sectionOrder || ["games", "tvshows", "lectura"]
      expandedSections = uiState.expandedSections || ["games", "tvshows", "lectura"]
    } catch (error) {
      console.error("Error al cargar estado de UI:", error)
    }
  }
}

function saveUIState() {
  const uiState = {
    sectionOrder,
    expandedSections,
  }
  localStorage.setItem("hobbyTracker_uiState", JSON.stringify(uiState))
}

function exportData() {
  const data = {
    ...appData,
    customLists: customLists,
    uiState: { sectionOrder, expandedSections },
    exportDate: new Date().toISOString(),
    version: "2.0",
  }

  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(dataBlob)
  link.download = `hobbytracker-backup-${new Date().toISOString().split("T")[0]}.json`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

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

      if (!data.juegos && !data.tvshows && !data.lectura) {
        throw new Error("Estructura de datos inválida")
      }

      if (
        confirm("¿Estás seguro de que quieres importar estos datos?\n\n⚠️ Esto reemplazará todos tus datos actuales.")
      ) {
        appData = {
          juegos: data.juegos || [],
          tvshows: {
            peliculas: data.tvshows?.peliculas || [],
            series: data.tvshows?.series || [],
            animes: data.tvshows?.animes || [],
          },
          lectura: {
            libros: data.lectura?.libros || [],
            mangas: data.lectura?.mangas || [],
            novelas: data.lectura?.novelas || [],
          },
        }

        if (data.customLists) {
          customLists = {
            games: data.customLists.games || [],
            tvshows: data.customLists.tvshows || [],
            lectura: data.customLists.lectura || [],
          }
        }

        if (data.uiState) {
          sectionOrder = data.uiState.sectionOrder || ["games", "tvshows", "lectura"]
          expandedSections = data.uiState.expandedSections || ["games", "tvshows", "lectura"]
        }

        saveData()
        saveUIState()
        renderSidebar()
        filterContent()
        switchView("games-all")

        alert("✅ Datos importados correctamente")
      }
    } catch (error) {
      console.error("Error al importar datos:", error)
      alert(`❌ Error al importar datos: ${error.message}`)
    }
  }

  reader.readAsText(file)
  event.target.value = ""
}

function switchView(view) {
  currentView = view

  // Mostrar controles por defecto
  elements.addItemBtn.style.display = "flex"
  elements.genreFilter.style.display = "block"
  elements.statusFilter.style.display = "block"
  elements.searchInput.style.display = "block"

  // Determinar tipo de contenido y configurar vista
  if (view.startsWith("games-")) {
    currentContentType = "games"
    setupGameView(view)
  } else if (["movies", "series", "animes"].includes(view)) {
    currentContentType = view
    setupMediaView(view)
  } else if (["libros", "mangas", "novelas"].includes(view)) {
    currentContentType = view
    setupReadingView(view)
  } else if (view.startsWith("list_")) {
    setupCustomListView(view)
  }

  renderSidebar()
  filterContent()
}

function setupGameView(view) {
  const titles = {
    "games-all": "Todos los juegos",
    "games-playing": "Jugando",
    "games-completed": "Completados",
    "games-paused": "Pausados",
    "games-abandoned": "Abandonados",
    "games-wishlist": "Lista de deseos",
  }

  elements.pageTitle.textContent = titles[view] || view
  elements.pageSubtitle.textContent = "Gestiona tu biblioteca de videojuegos"
  elements.addItemBtn.querySelector(".btn-text").textContent = "Añadir juego"

  if (view === "games-all") {
    elements.statsContainer.classList.remove("hidden")
  } else {
    elements.statsContainer.classList.add("hidden")
  }

  setupGameFilters()
}

function setupMediaView(view) {
  const titles = {
    movies: "Películas",
    series: "Series",
    animes: "Animes",
  }

  const subtitles = {
    movies: "Gestiona tu colección de películas",
    series: "Gestiona tu colección de series",
    animes: "Gestiona tu colección de animes",
  }

  elements.pageTitle.textContent = titles[view]
  elements.pageSubtitle.textContent = subtitles[view]
  elements.addItemBtn.querySelector(".btn-text").textContent =
    `Añadir ${view === "movies" ? "película" : view === "series" ? "serie" : "anime"}`
  elements.statsContainer.classList.add("hidden")

  setupMediaFilters(view)
}

function setupReadingView(view) {
  const titles = {
    libros: "Libros",
    mangas: "Mangas",
    novelas: "Novelas",
  }

  const subtitles = {
    libros: "Gestiona tu biblioteca de libros",
    mangas: "Gestiona tu colección de mangas",
    novelas: "Gestiona tu colección de novelas",
  }

  elements.pageTitle.textContent = titles[view]
  elements.pageSubtitle.textContent = subtitles[view]
  elements.addItemBtn.querySelector(".btn-text").textContent = `Añadir ${view.slice(0, -1)}`
  elements.statsContainer.classList.add("hidden")

  setupReadingFilters(view)
}

function setupCustomListView(view) {
  const parts = view.split("_")
  const sectionId = parts[1]
  const listId = parts[2]

  let list = null
  if (customLists[sectionId]) {
    list = customLists[sectionId].find((l) => l.id === listId)
  }

  elements.pageTitle.textContent = list ? list.name : "Lista personalizada"
  elements.pageSubtitle.textContent = "Lista personalizada"

  // Determinar el tipo de contenido basado en la sección
  if (sectionId === "games") {
    currentContentType = "games"
    elements.addItemBtn.querySelector(".btn-text").textContent = "Añadir juego"
    setupGameFilters()
  } else if (sectionId === "tvshows") {
    currentContentType = "movies" // Default para tvshows
    elements.addItemBtn.querySelector(".btn-text").textContent = "Añadir contenido"
    setupMediaFilters("movies")
  } else if (sectionId === "lectura") {
    currentContentType = "libros" // Default para lectura
    elements.addItemBtn.querySelector(".btn-text").textContent = "Añadir contenido"
    setupReadingFilters("libros")
  }

  elements.statsContainer.classList.add("hidden")
}

function setupGameFilters() {
  elements.genreFilter.innerHTML = '<option value="all">Todos los géneros</option>'
  elements.statusFilter.innerHTML = '<option value="all">Todos los estados</option>'

  contentGenres.games.forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.textContent = genre
    elements.genreFilter.appendChild(option)
  })

  const gameStatuses = [
    { value: "wishlist", text: "Lista de deseos" },
    { value: "playing", text: "Jugando" },
    { value: "completed", text: "Completado" },
    { value: "paused", text: "Pausado" },
    { value: "abandoned", text: "Abandonado" },
  ]

  gameStatuses.forEach((status) => {
    const option = document.createElement("option")
    option.value = status.value
    option.textContent = status.text
    elements.statusFilter.appendChild(option)
  })
}

function setupMediaFilters(type) {
  elements.genreFilter.innerHTML = '<option value="all">Todos los géneros</option>'
  elements.statusFilter.innerHTML = '<option value="all">Todos los estados</option>'

  contentGenres[type].forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.textContent = genre
    elements.genreFilter.appendChild(option)
  })

  const mediaStatuses = [
    { value: "pendiente", text: "Pendiente" },
    { value: "viendo", text: type === "movies" ? "Vista" : "Viendo" },
    { value: "terminado", text: "Terminado" },
    { value: "pausado", text: "Pausado" },
    { value: "abandonado", text: "Abandonado" },
  ]

  mediaStatuses.forEach((status) => {
    const option = document.createElement("option")
    option.value = status.value
    option.textContent = status.text
    elements.statusFilter.appendChild(option)
  })
}

function setupReadingFilters(type) {
  elements.genreFilter.innerHTML = '<option value="all">Todos los géneros</option>'
  elements.statusFilter.innerHTML = '<option value="all">Todos los estados</option>'

  contentGenres[type].forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.textContent = genre
    elements.genreFilter.appendChild(option)
  })

  const readingStatuses = [
    { value: "pendiente", text: "Pendiente" },
    { value: "viendo", text: "Leyendo" },
    { value: "terminado", text: "Terminado" },
    { value: "pausado", text: "Pausado" },
    { value: "abandonado", text: "Abandonado" },
  ]

  readingStatuses.forEach((status) => {
    const option = document.createElement("option")
    option.value = status.value
    option.textContent = status.text
    elements.statusFilter.appendChild(option)
  })
}

function filterContent() {
  const searchTerm = elements.searchInput.value.toLowerCase()
  const genreFilter = elements.genreFilter.value
  const statusFilter = elements.statusFilter.value

  let sourceData = []

  // Obtener datos según la vista actual
  if (currentView.startsWith("games-")) {
    sourceData = appData.juegos
  } else if (currentView === "movies") {
    sourceData = appData.tvshows.peliculas
  } else if (currentView === "series") {
    sourceData = appData.tvshows.series
  } else if (currentView === "animes") {
    sourceData = appData.tvshows.animes
  } else if (currentView === "libros") {
    sourceData = appData.lectura.libros
  } else if (currentView === "mangas") {
    sourceData = appData.lectura.mangas
  } else if (currentView === "novelas") {
    sourceData = appData.lectura.novelas
  } else if (currentView.startsWith("list_")) {
    const parts = currentView.split("_")
    const sectionId = parts[1]
    const listId = parts[2]

    if (sectionId === "games") {
      sourceData = appData.juegos.filter((item) => item.customList === listId)
    } else if (sectionId === "tvshows") {
      sourceData = [...appData.tvshows.peliculas, ...appData.tvshows.series, ...appData.tvshows.animes].filter(
        (item) => item.customList === listId,
      )
    } else if (sectionId === "lectura") {
      sourceData = [...appData.lectura.libros, ...appData.lectura.mangas, ...appData.lectura.novelas].filter(
        (item) => item.customList === listId,
      )
    }
  }

  filteredContent = sourceData.filter((item) => {
    // Filtro de búsqueda
    const matchesSearch =
      item.titulo?.toLowerCase().includes(searchTerm) ||
      item.title?.toLowerCase().includes(searchTerm) ||
      (item.saga && item.saga.toLowerCase().includes(searchTerm))

    // Filtro de género
    const matchesGenre = genreFilter === "all" || item.genero === genreFilter || item.genre === genreFilter

    // Filtro de estado
    let matchesStatus = true
    if (statusFilter !== "all") {
      if (currentView.startsWith("games-")) {
        if (currentView === "games-all") {
          matchesStatus = item.status === statusFilter
        } else {
          const viewStatus = currentView.replace("games-", "")
          matchesStatus = item.status === viewStatus
        }
      } else {
        matchesStatus = item.estado === statusFilter
      }
    } else if (currentView.startsWith("games-") && currentView !== "games-all") {
      const viewStatus = currentView.replace("games-", "")
      matchesStatus = item.status === viewStatus
    }

    return matchesSearch && matchesGenre && matchesStatus
  })

  updateDisplay()
}

function updateDisplay() {
  updateStats()
  updateCounts()
  updateContentGrid()
}

function updateStats() {
  const games = appData.juegos.filter((g) => g.status !== "wishlist")
  const platinums = games.filter((g) => g.platinumObtained).length
  const totalHours = games.reduce((sum, game) => sum + (game.hoursPlayed || 0), 0)
  const totalAchievements = games.reduce((sum, game) => sum + (game.totalAchievements || 0), 0)

  elements.statsPlatinums.textContent = platinums
  elements.statsTotalHours.textContent = totalHours
  elements.statsTotalAchievements.textContent = totalAchievements
}

function updateCounts() {
  // Contadores de juegos
  const allGamesCountEl = document.getElementById("allGamesCount")
  const playingCountEl = document.getElementById("playingCount")
  const completedCountEl = document.getElementById("completedCount")
  const pausedCountEl = document.getElementById("pausedCount")
  const abandonedCountEl = document.getElementById("abandonedCount")
  const wishlistCountEl = document.getElementById("wishlistCount")

  if (allGamesCountEl) allGamesCountEl.textContent = appData.juegos.length
  if (playingCountEl) playingCountEl.textContent = appData.juegos.filter((g) => g.status === "playing").length
  if (completedCountEl) completedCountEl.textContent = appData.juegos.filter((g) => g.status === "completed").length
  if (pausedCountEl) pausedCountEl.textContent = appData.juegos.filter((g) => g.status === "paused").length
  if (abandonedCountEl) abandonedCountEl.textContent = appData.juegos.filter((g) => g.status === "abandoned").length
  if (wishlistCountEl) wishlistCountEl.textContent = appData.juegos.filter((g) => g.status === "wishlist").length

  // Contadores de TV Shows
  const moviesCountEl = document.getElementById("moviesCount")
  const seriesCountEl = document.getElementById("seriesCount")
  const animesCountEl = document.getElementById("animesCount")

  if (moviesCountEl) moviesCountEl.textContent = appData.tvshows.peliculas.length
  if (seriesCountEl) seriesCountEl.textContent = appData.tvshows.series.length
  if (animesCountEl) animesCountEl.textContent = appData.tvshows.animes.length

  // Contadores de Lectura
  const librosCountEl = document.getElementById("librosCount")
  const mangasCountEl = document.getElementById("mangasCount")
  const novelasCountEl = document.getElementById("novelasCount")

  if (librosCountEl) librosCountEl.textContent = appData.lectura.libros.length
  if (mangasCountEl) mangasCountEl.textContent = appData.lectura.mangas.length
  if (novelasCountEl) novelasCountEl.textContent = appData.lectura.novelas.length
}

function updateContentGrid() {
  elements.contentGrid.innerHTML = ""

  // Manejar vistas de estadísticas
  if (currentContentType === "tvshows-stats") {
    renderTVShowsStats()
    return
  } else if (currentContentType === "lectura-stats") {
    renderLecturaStats()
    return
  }

  if (filteredContent.length === 0) {
    elements.emptyState.style.display = "block"
    elements.contentGrid.style.display = "none"
  } else {
    elements.emptyState.style.display = "none"
    elements.contentGrid.style.display = "grid"

    filteredContent.forEach((item) => {
      if (currentView.startsWith("games-") || (currentView.startsWith("list_") && currentView.includes("games"))) {
        elements.contentGrid.appendChild(createGameCard(item))
      } else {
        elements.contentGrid.appendChild(createMediaCard(item))
      }
    })
  }
}

function renderTVShowsStats() {
  elements.emptyState.style.display = "none"
  elements.contentGrid.style.display = "grid"

  const peliculas = appData.tvshows.peliculas
  const series = appData.tvshows.series
  const animes = appData.tvshows.animes
  const allTVShows = [...peliculas, ...series, ...animes]

  // Calcular estadísticas
  const stats = {
    totalPeliculas: peliculas.length,
    totalSeries: series.length,
    totalAnimes: animes.length,
    totalItems: allTVShows.length,

    // Géneros más vistos
    topGenres: getTopGenres(allTVShows),

    // Mejores calificaciones
    bestRatedMovie: getBestRated(peliculas),
    bestRatedSerie: getBestRated(series),
    bestRatedAnime: getBestRated(animes),

    // Estados
    terminados: allTVShows.filter((item) => item.estado === "terminado").length,
    viendo: allTVShows.filter((item) => item.estado === "viendo").length,
    pendientes: allTVShows.filter((item) => item.estado === "pendiente").length,

    // Promedio de calificaciones
    avgRating: getAverageRating(allTVShows),
  }

  elements.contentGrid.innerHTML = `
    <div class="stats-overview">
      <div class="stats-cards">
        <div class="stat-card stat-primary">
          <div class="stat-icon">🎬</div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalPeliculas}</div>
            <div class="stat-label">Películas</div>
          </div>
        </div>
        <div class="stat-card stat-info">
          <div class="stat-icon">📺</div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalSeries}</div>
            <div class="stat-label">Series</div>
          </div>
        </div>
        <div class="stat-card stat-warning">
          <div class="stat-icon">🍥</div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalAnimes}</div>
            <div class="stat-label">Animes</div>
          </div>
        </div>
        <div class="stat-card stat-success">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-number">${stats.terminados}</div>
            <div class="stat-label">Terminados</div>
          </div>
        </div>
      </div>

      <div class="stats-details">
        <div class="stats-section">
          <h3>📊 Géneros Más Vistos</h3>
          <div class="genre-list">
            ${stats.topGenres
              .slice(0, 5)
              .map(
                (genre) => `
              <div class="genre-item">
                <span class="genre-name">${genre.name}</span>
                <span class="genre-count">${genre.count} elementos</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="stats-section">
          <h3>⭐ Mejores Calificaciones</h3>
          <div class="best-rated">
            ${
              stats.bestRatedMovie
                ? `
              <div class="rated-item">
                <span class="rated-type">🎬 Película:</span>
                <span class="rated-title">${stats.bestRatedMovie.titulo}</span>
                <span class="rated-score">${stats.bestRatedMovie.calificacion}/10</span>
              </div>
            `
                : ""
            }
            ${
              stats.bestRatedSerie
                ? `
              <div class="rated-item">
                <span class="rated-type">📺 Serie:</span>
                <span class="rated-title">${stats.bestRatedSerie.titulo}</span>
                <span class="rated-score">${stats.bestRatedSerie.calificacion}/10</span>
              </div>
            `
                : ""
            }
            ${
              stats.bestRatedAnime
                ? `
              <div class="rated-item">
                <span class="rated-type">🍥 Anime:</span>
                <span class="rated-title">${stats.bestRatedAnime.titulo}</span>
                <span class="rated-score">${stats.bestRatedAnime.calificacion}/10</span>
              </div>
            `
                : ""
            }
          </div>
        </div>

        <div class="stats-section">
          <h3>📈 Resumen General</h3>
          <div class="summary-stats">
            <div class="summary-item">
              <span class="summary-label">Total de elementos:</span>
              <span class="summary-value">${stats.totalItems}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Calificación promedio:</span>
              <span class="summary-value">${stats.avgRating}/10</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Viendo actualmente:</span>
              <span class="summary-value">${stats.viendo}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">En lista de pendientes:</span>
              <span class="summary-value">${stats.pendientes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderLecturaStats() {
  elements.emptyState.style.display = "none"
  elements.contentGrid.style.display = "grid"

  const libros = appData.lectura.libros
  const mangas = appData.lectura.mangas
  const novelas = appData.lectura.novelas
  const allReading = [...libros, ...mangas, ...novelas]

  // Calcular estadísticas
  const stats = {
    totalLibros: libros.length,
    totalMangas: mangas.length,
    totalNovelas: novelas.length,
    totalItems: allReading.length,

    // Géneros más leídos
    topGenres: getTopGenres(allReading),

    // Mejores calificaciones
    bestRatedLibro: getBestRated(libros),
    bestRatedManga: getBestRated(mangas),
    bestRatedNovela: getBestRated(novelas),

    // Estados
    terminados: allReading.filter((item) => item.estado === "terminado").length,
    leyendo: allReading.filter((item) => item.estado === "viendo").length,
    pendientes: allReading.filter((item) => item.estado === "pendiente").length,

    // Promedio de calificaciones
    avgRating: getAverageRating(allReading),
  }

  elements.contentGrid.innerHTML = `
    <div class="stats-overview">
      <div class="stats-cards">
        <div class="stat-card stat-primary">
          <div class="stat-icon">📖</div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalLibros}</div>
            <div class="stat-label">Libros</div>
          </div>
        </div>
        <div class="stat-card stat-info">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalMangas}</div>
            <div class="stat-label">Mangas</div>
          </div>
        </div>
        <div class="stat-card stat-warning">
          <div class="stat-icon">🧠</div>
          <div class="stat-content">
            <div class="stat-number">${stats.totalNovelas}</div>
            <div class="stat-label">Novelas</div>
          </div>
        </div>
        <div class="stat-card stat-success">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-number">${stats.terminados}</div>
            <div class="stat-label">Terminados</div>
          </div>
        </div>
      </div>

      <div class="stats-details">
        <div class="stats-section">
          <h3>📊 Géneros Más Leídos</h3>
          <div class="genre-list">
            ${stats.topGenres
              .slice(0, 5)
              .map(
                (genre) => `
              <div class="genre-item">
                <span class="genre-name">${genre.name}</span>
                <span class="genre-count">${genre.count} elementos</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="stats-section">
          <h3>⭐ Mejores Calificaciones</h3>
          <div class="best-rated">
            ${
              stats.bestRatedLibro
                ? `
              <div class="rated-item">
                <span class="rated-type">📖 Libro:</span>
                <span class="rated-title">${stats.bestRatedLibro.titulo}</span>
                <span class="rated-score">${stats.bestRatedLibro.calificacion}/10</span>
              </div>
            `
                : ""
            }
            ${
              stats.bestRatedManga
                ? `
              <div class="rated-item">
                <span class="rated-type">📚 Manga:</span>
                <span class="rated-title">${stats.bestRatedManga.titulo}</span>
                <span class="rated-score">${stats.bestRatedManga.calificacion}/10</span>
              </div>
            `
                : ""
            }
            ${
              stats.bestRatedNovela
                ? `
              <div class="rated-item">
                <span class="rated-type">🧠 Novela:</span>
                <span class="rated-title">${stats.bestRatedNovela.titulo}</span>
                <span class="rated-score">${stats.bestRatedNovela.calificacion}/10</span>
              </div>
            `
                : ""
            }
          </div>
        </div>

        <div class="stats-section">
          <h3>📈 Resumen General</h3>
          <div class="summary-stats">
            <div class="summary-item">
              <span class="summary-label">Total de elementos:</span>
              <span class="summary-value">${stats.totalItems}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Calificación promedio:</span>
              <span class="summary-value">${stats.avgRating}/10</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Leyendo actualmente:</span>
              <span class="summary-value">${stats.leyendo}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">En lista de pendientes:</span>
              <span class="summary-value">${stats.pendientes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Funciones auxiliares para estadísticas
function getTopGenres(items) {
  const genreCount = {}
  items.forEach((item) => {
    if (item.genero) {
      genreCount[item.genero] = (genreCount[item.genero] || 0) + 1
    }
  })

  return Object.entries(genreCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

function getBestRated(items) {
  return items.filter((item) => item.calificacion > 0).sort((a, b) => b.calificacion - a.calificacion)[0]
}

function getAverageRating(items) {
  const ratedItems = items.filter((item) => item.calificacion > 0)
  if (ratedItems.length === 0) return 0

  const sum = ratedItems.reduce((total, item) => total + item.calificacion, 0)
  return (sum / ratedItems.length).toFixed(1)
}

function createGameCard(game) {
  const card = document.createElement("div")
  card.className = "content-card"

  const achievementProgress =
    game.totalAchievements > 0 ? Math.round((game.completedAchievements / game.totalAchievements) * 100) : 0

  const statusLabels = {
    completed: "Completado",
    playing: "Jugando",
    paused: "Pausado",
    abandoned: "Abandonado",
    wishlist: "Lista de deseos",
  }

  const listName = game.customList ? customLists.games?.find((l) => l.id === game.customList)?.name || "" : ""

  card.innerHTML = `
    <div class="content-card-header">
      <h3 class="content-card-title">${game.title}</h3>
      ${game.saga ? `<p class="content-card-saga">${game.saga}</p>` : ""}
      <div class="content-badges">
        ${game.genre ? `<span class="badge badge-genre">${game.genre}</span>` : ""}
        ${game.platform ? `<span class="badge badge-platform">${game.platform}</span>` : ""}
        <span class="badge badge-status badge-${game.status}">${statusLabels[game.status]}</span>
        ${listName ? `<span class="badge badge-genre">${listName}</span>` : ""}
      </div>
    </div>
    
    <div class="content-card-body">
      ${
        game.status !== "wishlist"
          ? `
        <div class="content-stats">
          <div class="content-stat">
            <span class="content-stat-icon">🕒</span>
            <span>${game.hoursPlayed || 0}h jugadas</span>
          </div>
          ${
            game.platinumObtained
              ? `
            <div class="content-stat">
              <span class="content-stat-icon">🏆</span>
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
          <div class="content-rating">
            <span class="content-stat-icon">⭐</span>
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
        <div class="content-notes">
          <p class="content-notes-title">Notas:</p>
          <p class="content-notes-text">${game.notes}</p>
        </div>
      `
          : ""
      }
    </div>
    
    <div class="content-actions">
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

function createMediaCard(item) {
  const card = document.createElement("div")
  card.className = "content-card"

  const statusLabels = {
    pendiente: "Pendiente",
    viendo:
      currentContentType === "movies"
        ? "Vista"
        : currentContentType === "libros" || currentContentType === "mangas" || currentContentType === "novelas"
          ? "Leyendo"
          : "Viendo",
    terminado: "Terminado",
    pausado: "Pausado",
    abandonado: "Abandonado",
  }

  const typeIcons = {
    movies: "🎬",
    series: "📺",
    animes: "🍥",
    libros: "📖",
    mangas: "📚",
    novelas: "🧠",
  }

  card.innerHTML = `
    <div class="content-card-header">
      <h3 class="content-card-title">${item.titulo}</h3>
      <div class="content-badges">
        ${item.genero ? `<span class="badge badge-genre">${item.genero}</span>` : ""}
        <span class="badge badge-status badge-${item.estado}">${statusLabels[item.estado]}</span>
      </div>
    </div>
    
    <div class="content-card-body">
      ${
        (item.temporada || item.capitulo) &&
        (
          currentContentType === "series" ||
            currentContentType === "animes" ||
            currentContentType === "mangas" ||
            currentContentType === "novelas"
        )
          ? `
        <div class="progress-info">
          <div class="progress-info-title">${typeIcons[currentContentType]} Progreso actual</div>
          <div class="progress-info-text">
            ${item.temporada ? `Temporada ${item.temporada}` : ""}
            ${item.temporada && item.capitulo ? " - " : ""}
            ${item.capitulo ? `Capítulo ${item.capitulo}` : ""}
          </div>
        </div>
      `
          : ""
      }
      
      ${
        item.calificacion > 0
          ? `
        <div class="content-rating">
          <span class="content-stat-icon">⭐</span>
          <span>${item.calificacion}/10</span>
        </div>
      `
          : ""
      }
      
      ${
        item.comentario
          ? `
        <div class="content-notes">
          <p class="content-notes-title">Comentario:</p>
          <p class="content-notes-text">${item.comentario}</p>
        </div>
      `
          : ""
      }
    </div>
    
    <div class="content-actions">
      <button class="btn-edit" onclick="editMediaItem('${item.id}')">
        ✏️ Editar
      </button>
      <button class="btn-delete" onclick="deleteMediaItem('${item.id}')">
        🗑️ Eliminar
      </button>
    </div>
  `

  return card
}

// Funciones para listas personalizadas por sección
function openCreateSectionListModal(sectionId) {
  currentEditingSectionId = sectionId
  elements.listModal.classList.add("active")
  populateListExamples(sectionId)
}

function closeCreateListModal() {
  elements.listModal.classList.remove("active")
  elements.listForm.reset()
  currentEditingSectionId = null
}

function handleListSubmit(e) {
  e.preventDefault()

  const listName = elements.listName.value.trim()
  const listDescription = elements.listDescription.value.trim()

  if (!listName || !currentEditingSectionId) return

  const listData = {
    id: Date.now().toString(),
    name: listName,
    description: listDescription,
  }

  if (!customLists[currentEditingSectionId]) {
    customLists[currentEditingSectionId] = []
  }

  customLists[currentEditingSectionId].push(listData)
  saveData()
  renderSidebar()
  updateCounts()
  closeCreateListModal()
}

function deleteSectionList(sectionId, listId) {
  const list = customLists[sectionId]?.find((l) => l.id === listId)
  if (!list) return

  if (confirm(`¿Estás seguro de que quieres eliminar la lista "${list.name}"?`)) {
    // Remover la lista de los elementos que la tengan asignada
    if (sectionId === "games") {
      appData.juegos.forEach((item) => {
        if (item.customList === listId) {
          item.customList = null
        }
      })
    } else if (sectionId === "tvshows") {
      ;[...appData.tvshows.peliculas, ...appData.tvshows.series, ...appData.tvshows.animes].forEach((item) => {
        if (item.customList === listId) {
          item.customList = null
        }
      })
    } else if (sectionId === "lectura") {
      ;[...appData.lectura.libros, ...appData.lectura.mangas, ...appData.lectura.novelas].forEach((item) => {
        if (item.customList === listId) {
          item.customList = null
        }
      })
    }

    // Eliminar la lista
    customLists[sectionId] = customLists[sectionId].filter((l) => l.id !== listId)

    // Si estamos viendo la lista eliminada, cambiar a vista por defecto
    if (currentView === `list_${sectionId}_${listId}`) {
      if (sectionId === "games") {
        switchView("games-all")
      } else if (sectionId === "tvshows") {
        switchView("movies")
      } else if (sectionId === "lectura") {
        switchView("libros")
      }
    }

    saveData()
    renderSidebar()
    filterContent()
  }
}

// Función para popular ejemplos de nombres de lista
function populateListExamples(sectionId) {
  const examples = listExamples[sectionId]
  if (examples) {
    elements.listName.placeholder = `Ej: ${examples[Math.floor(Math.random() * examples.length)]}`
  } else {
    elements.listName.placeholder = "Ej: Nombre de la lista"
  }
}

// Funciones de modal para juegos
function openAddModal() {
  if (currentView.startsWith("games-") || (currentView.startsWith("list_") && currentView.includes("games"))) {
    openAddGameModal()
  } else {
    openAddMediaModal()
  }
}

function openAddGameModal() {
  currentEditingItem = null
  elements.gameModalTitle.textContent = "Añadir nuevo juego"
  elements.gameSubmitBtnText.textContent = "Añadir juego"
  resetGameForm()
  populateGameLists()
  elements.gameModal.classList.add("active")
}

function populateGameLists() {
  elements.gameList.innerHTML = '<option value="">Sin lista</option>'

  if (customLists.games) {
    customLists.games.forEach((list) => {
      const option = document.createElement("option")
      option.value = list.id
      option.textContent = list.name
      elements.gameList.appendChild(option)
    })
  }
}

function editGame(gameId) {
  const game = appData.juegos.find((g) => g.id === gameId)
  if (!game) return

  currentEditingItem = game
  elements.gameModalTitle.textContent = "Editar juego"
  elements.gameSubmitBtnText.textContent = "Actualizar juego"

  // Llenar formulario
  elements.gameTitle.value = game.title
  elements.gameSaga.value = game.saga || ""
  elements.gameGenre.value = game.genre || ""
  elements.gamePlatform.value = game.platform || ""
  elements.gameStatus.value = game.status
  elements.platinumObtained.checked = game.platinumObtained
  elements.gameNotes.value = game.notes || ""

  // Campos numéricos
  elements.gameHours.value = game.hoursPlayed > 0 ? game.hoursPlayed.toString() : ""
  elements.gameTotalAchievements.value = game.totalAchievements > 0 ? game.totalAchievements.toString() : ""
  elements.gameCompletedAchievements.value = game.completedAchievements > 0 ? game.completedAchievements.toString() : ""
  elements.gameRating.value = game.rating > 0 ? game.rating.toString() : ""

  populateGameLists()
  elements.gameList.value = game.customList || ""

  elements.gameModal.classList.add("active")
}

function deleteGame(gameId) {
  const game = appData.juegos.find((g) => g.id === gameId)
  if (!game) return

  if (confirm(`¿Estás seguro de que quieres eliminar "${game.title}"?`)) {
    appData.juegos = appData.juegos.filter((g) => g.id !== gameId)
    saveData()
    renderSidebar()
    filterContent()
  }
}

function closeGameModal() {
  elements.gameModal.classList.remove("active")
  currentEditingItem = null
  resetGameForm()
}

function resetGameForm() {
  elements.gameForm.reset()
}

function handleGameSubmit(e) {
  e.preventDefault()

  function getNumericValue(fieldValue) {
    const trimmed = fieldValue.trim()
    if (trimmed === "" || trimmed === null || trimmed === undefined) {
      return 0
    }
    const parsed = Number.parseFloat(trimmed)
    return isNaN(parsed) ? 0 : parsed
  }

  const gameData = {
    id: currentEditingItem ? currentEditingItem.id : Date.now().toString(),
    title: elements.gameTitle.value.trim(),
    saga: elements.gameSaga.value.trim(),
    genre: elements.gameGenre.value,
    platform: elements.gamePlatform.value,
    status: elements.gameStatus.value,
    hoursPlayed: getNumericValue(elements.gameHours.value),
    totalAchievements: Number.parseInt(elements.gameTotalAchievements.value) || 0,
    completedAchievements: Number.parseInt(elements.gameCompletedAchievements.value) || 0,
    rating: getNumericValue(elements.gameRating.value),
    platinumObtained: elements.platinumObtained.checked,
    customList: elements.gameList.value || null,
    notes: elements.gameNotes.value.trim(),
  }

  if (currentEditingItem) {
    const index = appData.juegos.findIndex((g) => g.id === currentEditingItem.id)
    appData.juegos[index] = gameData
  } else {
    appData.juegos.push(gameData)
  }

  saveData()
  renderSidebar()
  filterContent()
  closeGameModal()
}

// Funciones de modal para media
function openAddMediaModal() {
  currentEditingItem = null

  const titles = {
    movies: "Añadir película",
    series: "Añadir serie",
    animes: "Añadir anime",
    libros: "Añadir libro",
    mangas: "Añadir manga",
    novelas: "Añadir novela",
  }

  elements.mediaModalTitle.textContent = titles[currentContentType]
  elements.mediaSubmitBtnText.textContent = titles[currentContentType]

  resetMediaForm()
  setupMediaFormFields()
  populateMediaGenres()
  populateMediaLists()
  elements.mediaModal.classList.add("active")
}

function populateMediaLists() {
  // Determinar la sección basada en el tipo de contenido actual
  let sectionId = ""
  if (["movies", "series", "animes"].includes(currentContentType)) {
    sectionId = "tvshows"
  } else if (["libros", "mangas", "novelas"].includes(currentContentType)) {
    sectionId = "lectura"
  }

  // Agregar campo de lista si no existe
  let listSelect = document.getElementById("mediaList")
  if (!listSelect) {
    const listGroup = document.createElement("div")
    listGroup.className = "form-group"
    listGroup.innerHTML = `
      <label for="mediaList">Lista personalizada</label>
      <select id="mediaList">
        <option value="">Sin lista</option>
      </select>
    `

    // Insertar antes del campo de comentario
    const commentGroup = elements.mediaComment.closest(".form-group")
    commentGroup.parentNode.insertBefore(listGroup, commentGroup)
    listSelect = document.getElementById("mediaList")
  }

  // Limpiar y popular opciones
  listSelect.innerHTML = '<option value="">Sin lista</option>'

  if (sectionId && customLists[sectionId]) {
    customLists[sectionId].forEach((list) => {
      const option = document.createElement("option")
      option.value = list.id
      option.textContent = list.name
      listSelect.appendChild(option)
    })
  }
}

function editMediaItem(itemId) {
  let item = null

  if (currentContentType === "movies") {
    item = appData.tvshows.peliculas.find((i) => i.id === itemId)
  } else if (currentContentType === "series") {
    item = appData.tvshows.series.find((i) => i.id === itemId)
  } else if (currentContentType === "animes") {
    item = appData.tvshows.animes.find((i) => i.id === itemId)
  } else if (currentContentType === "libros") {
    item = appData.lectura.libros.find((i) => i.id === itemId)
  } else if (currentContentType === "mangas") {
    item = appData.lectura.mangas.find((i) => i.id === itemId)
  } else if (currentContentType === "novelas") {
    item = appData.lectura.novelas.find((i) => i.id === itemId)
  }

  if (!item) return

  currentEditingItem = item

  const titles = {
    movies: "Editar película",
    series: "Editar serie",
    animes: "Editar anime",
    libros: "Editar libro",
    mangas: "Editar manga",
    novelas: "Editar novela",
  }

  elements.mediaModalTitle.textContent = titles[currentContentType]
  elements.mediaSubmitBtnText.textContent = "Actualizar"

  // Llenar formulario
  elements.mediaTitle.value = item.titulo
  elements.mediaGenre.value = item.genero || ""
  elements.mediaStatus.value = item.estado
  elements.mediaRating.value = item.calificacion > 0 ? item.calificacion.toString() : ""
  elements.mediaComment.value = item.comentario || ""

  // Campos específicos
  if (item.temporada) {
    elements.mediaSeason.value = item.temporada.toString()
  }
  if (item.capitulo) {
    elements.mediaEpisode.value = item.capitulo.toString()
    elements.mediaChapter.value = item.capitulo.toString()
  }

  setupMediaFormFields()
  populateMediaGenres()
  populateMediaLists()

  // Establecer lista personalizada si existe
  const listSelect = document.getElementById("mediaList")
  if (listSelect && item.customList) {
    listSelect.value = item.customList
  }

  elements.mediaModal.classList.add("active")
}

function deleteMediaItem(itemId) {
  let item = null
  let itemArray = null

  if (currentContentType === "movies") {
    itemArray = appData.tvshows.peliculas
    item = itemArray.find((i) => i.id === itemId)
  } else if (currentContentType === "series") {
    itemArray = appData.tvshows.series
    item = itemArray.find((i) => i.id === itemId)
  } else if (currentContentType === "animes") {
    itemArray = appData.tvshows.animes
    item = itemArray.find((i) => i.id === itemId)
  } else if (currentContentType === "libros") {
    itemArray = appData.lectura.libros
    item = itemArray.find((i) => i.id === itemId)
  } else if (currentContentType === "mangas") {
    itemArray = appData.lectura.mangas
    item = itemArray.find((i) => i.id === itemId)
  } else if (currentContentType === "novelas") {
    itemArray = appData.lectura.novelas
    item = itemArray.find((i) => i.id === itemId)
  }

  if (!item) return

  if (confirm(`¿Estás seguro de que quieres eliminar "${item.titulo}"?`)) {
    const index = itemArray.findIndex((i) => i.id === itemId)
    itemArray.splice(index, 1)
    saveData()
    filterContent()
  }
}

function closeMediaModal() {
  elements.mediaModal.classList.remove("active")
  currentEditingItem = null
  resetMediaForm()
}

function resetMediaForm() {
  elements.mediaForm.reset()
  // Remover campo de lista si existe
  const listSelect = document.getElementById("mediaList")
  if (listSelect) {
    listSelect.closest(".form-group").remove()
  }
}

function setupMediaFormFields() {
  // Ocultar todos los campos específicos
  elements.seasonGroup.style.display = "none"
  elements.episodeGroup.style.display = "none"
  elements.chapterGroup.style.display = "none"

  // Mostrar campos según el tipo
  if (currentContentType === "series" || currentContentType === "animes") {
    elements.seasonGroup.style.display = "block"
    elements.episodeGroup.style.display = "block"
  } else if (currentContentType === "mangas" || currentContentType === "novelas") {
    elements.chapterGroup.style.display = "block"
  }
}

function populateMediaGenres() {
  elements.mediaGenre.innerHTML = '<option value="">Selecciona un género</option>'

  contentGenres[currentContentType].forEach((genre) => {
    const option = document.createElement("option")
    option.value = genre
    option.textContent = genre
    elements.mediaGenre.appendChild(option)
  })
}

function handleMediaSubmit(e) {
  e.preventDefault()

  const listSelect = document.getElementById("mediaList")

  const itemData = {
    id: currentEditingItem ? currentEditingItem.id : Date.now().toString(),
    titulo: elements.mediaTitle.value.trim(),
    genero: elements.mediaGenre.value,
    estado: elements.mediaStatus.value,
    calificacion: Number.parseFloat(elements.mediaRating.value) || 0,
    comentario: elements.mediaComment.value.trim(),
    customList: listSelect ? listSelect.value || null : null,
  }

  // Agregar campos específicos
  if (currentContentType === "series" || currentContentType === "animes") {
    if (elements.mediaSeason.value) {
      itemData.temporada = Number.parseInt(elements.mediaSeason.value)
    }
    if (elements.mediaEpisode.value) {
      itemData.capitulo = Number.parseInt(elements.mediaEpisode.value)
    }
  } else if (currentContentType === "mangas" || currentContentType === "novelas") {
    if (elements.mediaChapter.value) {
      itemData.capitulo = Number.parseInt(elements.mediaChapter.value)
    }
  }

  // Guardar en la estructura correcta
  let targetArray = null
  if (currentContentType === "movies") {
    targetArray = appData.tvshows.peliculas
  } else if (currentContentType === "series") {
    targetArray = appData.tvshows.series
  } else if (currentContentType === "animes") {
    targetArray = appData.tvshows.animes
  } else if (currentContentType === "libros") {
    targetArray = appData.lectura.libros
  } else if (currentContentType === "mangas") {
    targetArray = appData.lectura.mangas
  } else if (currentContentType === "novelas") {
    targetArray = appData.lectura.novelas
  }

  if (currentEditingItem) {
    const index = targetArray.findIndex((i) => i.id === currentEditingItem.id)
    targetArray[index] = itemData
  } else {
    targetArray.push(itemData)
  }

  saveData()
  filterContent()
  closeMediaModal()
}

function validateAchievements() {
  const totalInput = elements.gameTotalAchievements
  const completedInput = elements.gameCompletedAchievements

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

  if (totalInput.value.trim() !== "" && completedInput.value.trim() !== "") {
    const finalTotal = Number.parseInt(totalInput.value, 10) || 0
    const finalCompleted = Number.parseInt(completedInput.value, 10) || 0

    if (finalCompleted > finalTotal && finalTotal > 0) {
      completedInput.value = finalTotal.toString()
    }
  }
}

// Funciones globales
window.openAddModal = openAddModal
window.openAddGameModal = openAddGameModal
window.editGame = editGame
window.deleteGame = deleteGame
window.closeGameModal = closeGameModal
window.editMediaItem = editMediaItem
window.deleteMediaItem = deleteMediaItem
window.closeMediaModal = closeMediaModal
window.openCreateSectionListModal = openCreateSectionListModal
window.closeCreateListModal = closeCreateListModal
window.deleteSectionList = deleteSectionList
window.toggleSection = toggleSection
window.exportData = exportData
window.triggerImport = triggerImport
window.importData = importData
