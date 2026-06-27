import React, { useState } from "react";
import Structure from "../../components/layout/Structure";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";

// Initial mockup CMS sections data
const INITIAL_SECTIONS = [
  {
    id: 1,
    name: "Home Hero Section",
    sub: "Top banner section on homepage.",
    slug: "home-hero",
    status: "Published",
    updated: "26 May 2024 10:30 AM",
    updatedEpoch: 1716719400000,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    page: "Homepage Sections"
  },
  {
    id: 2,
    name: "About Us Section",
    sub: "About our company section.",
    slug: "about-us",
    status: "Published",
    updated: "24 May 2024 04:15 PM",
    updatedEpoch: 1716567300000,
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=120&q=80",
    page: "Homepage Sections"
  },
  {
    id: 3,
    name: "Our Services Section",
    sub: "Services we provide to our clients.",
    slug: "our-services",
    status: "Published",
    updated: "25 May 2024 09:20 AM",
    updatedEpoch: 1716628800000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80",
    page: "Homepage Sections"
  },
  {
    id: 4,
    name: "Portfolio Section",
    sub: "Our recent work and projects.",
    slug: "portfolio",
    status: "Published",
    updated: "23 May 2024 01:45 PM",
    updatedEpoch: 1716471900000,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80",
    page: "Homepage Sections"
  },
  {
    id: 5,
    name: "Testimonials Section",
    sub: "What our clients say about us.",
    slug: "testimonials",
    status: "Published",
    updated: "22 May 2024 11:10 AM",
    updatedEpoch: 1716376200000,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=120&q=80",
    page: "Homepage Sections"
  },
  {
    id: 6,
    name: "Call To Action Section",
    sub: "Call to action section for leads.",
    slug: "call-to-action",
    status: "Draft",
    updated: "20 May 2024 03:25 PM",
    updatedEpoch: 1716204300000,
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=120&q=80",
    page: "Homepage Sections"
  },
  {
    id: 7,
    name: "Newsletter Section",
    sub: "Newsletter subscription section.",
    slug: "newsletter",
    status: "Published",
    updated: "21 May 2024 10:00 AM",
    updatedEpoch: 1716285600000,
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=120&q=80",
    page: "Global Sections"
  },
  {
    id: 8,
    name: "Footer Section",
    sub: "Website footer content and links.",
    slug: "footer",
    status: "Published",
    updated: "19 May 2024 06:30 PM",
    updatedEpoch: 1716114600000,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80",
    page: "Global Sections"
  }
];

const CMS = () => {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("All Pages");

  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");


  // Table state
  const [tableData, setTableData] = useState([]);
  const [tableTotal, setTableTotal] = useState(0);

  // Modal form state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formSub, setFormSub] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formStatus, setFormStatus] = useState("Published");
  const [formImage, setFormImage] = useState("");
  const [formPage, setFormPage] = useState("Homepage Sections");

  // Sidebar count data
  const sidebarItems = [
    { name: "All Pages", count: sections.length, color: "#1e74db" },
    { name: "Homepage Sections", count: sections.filter(s => s.page === "Homepage Sections").length, color: "#ef4444" },
    { name: "Global Sections", count: sections.filter(s => s.page === "Global Sections").length, color: "#22c55e" }
  ];

  // Table column configuration
  const columns = [
    { field: "sectionPage", label: "Section / Page" },
    { field: "keySlug", label: "Key / Slug" },
    { field: "status", label: "Status" },
    { field: "updated", label: "Updated" },
    { field: "actions", label: "Actions" }
  ];

  // Edit / Delete / Create callbacks
  const handleEdit = (id) => {
    const section = sections.find(s => s.id === id);
    if (!section) return;

    setModalMode("edit");
    setEditingSectionId(id);
    setFormName(section.name);
    setFormSub(section.sub);
    setFormSlug(section.slug);
    setFormStatus(section.status);
    setFormImage(section.image);
    setFormPage(section.page);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      setSections(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleCreateSection = () => {
    setModalMode("create");
    setEditingSectionId(null);
    setFormName("");
    setFormSub("");
    setFormSlug("");
    setFormStatus("Published");
    setFormImage("");
    setFormPage(selectedSidebarItem === "All Pages" ? "Homepage Sections" : selectedSidebarItem);
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) {
      alert("Please fill in Section Name and Key/Slug");
      return;
    }

    const timestamp = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + " " + new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    if (modalMode === "create") {
      const newSec = {
        id: Date.now(),
        name: formName,
        sub: formSub || "Custom created website section.",
        slug: formSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        status: formStatus,
        updated: timestamp,
        updatedEpoch: Date.now(),
        image: formImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
        page: formPage
      };
      setSections(prev => [newSec, ...prev]);
    } else {
      setSections(prev => prev.map(s => s.id === editingSectionId ? {
        ...s,
        name: formName,
        sub: formSub,
        slug: formSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        status: formStatus,
        updated: timestamp,
        updatedEpoch: Date.now(),
        image: formImage || s.image,
        page: formPage
      } : s));
    }

    setModalOpen(false);
  };

  // Format sections data into elements suitable for Table component
  const formatSections = (items) => {
    return items.map(s => {
      const isPublished = s.status === "Published";
      const statusClass = isPublished
        ? "text-success font-600 bg-light-success px-8 py-4 rounded-5"
        : "text-warning font-600 bg-light-warning px-8 py-4 rounded-5";

      return {
        id: s.id,
        sectionPage: (
          <div className="flex items-center gap-12 py-4">
            <img
              src={s.image}
              alt={s.name}
              className="rounded-5 object-cover border-tertiary"
              style={{ width: "96px", height: "54px", display: "block" }}
            />
            <div className="grid-cols-1">
              <p className="small-text font-600 text-dark m-0" style={{ whiteSpace: "normal" }}>
                {s.name}
              </p>
              <p className="mini-text text-gray m-0" style={{ whiteSpace: "normal" }}>
                {s.sub}
              </p>
            </div>
          </div>
        ),
        keySlug: (
          <span className="small-text text-gray font-500">{s.slug}</span>
        ),
        status: (
          <span className={`${statusClass}`} style={{ whiteSpace: "nowrap" }}>
            {s.status}
          </span>
        ),
        updated: (
          <div className="grid-cols-1 mini-text text-dark font-500">
            <div>{s.updated.split(" ").slice(0, 3).join(" ")}</div>
            <div className="text-gray">{s.updated.split(" ").slice(3).join(" ")}</div>
          </div>
        ),
        actions: (
          <div className="flex gap-8 justify-center">
            <Button
              version="v2"
              bg="white"
              color="primary"
              border="primary"
              className="p-6 cursor-pointer"
              onClick={() => handleEdit(s.id)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </Button>
            <Button
              version="v2"
              bg="white"
              color="danger"
              border="danger"
              className="p-6 cursor-pointer"
              onClick={() => handleDelete(s.id)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </Button>
          </div>
        )
      };
    });
  };

  // Data fetching hook that is triggered by Table mounting/pagination
  const handleFetchData = async ({ page }) => {
    let raw = sections;

    // Filter by sidebar category selection
    if (selectedSidebarItem !== "All Pages") {
      raw = raw.filter(s => s.page === selectedSidebarItem);
    }

    // Filter by status dropdown in collapsible filter area
    if (selectedStatus !== "All") {
      raw = raw.filter(s => s.status === selectedStatus);
    }

    // Filter by text search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      raw = raw.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q) ||
          s.sub.toLowerCase().includes(q)
      );
    }

    // Sort operations
    if (sortBy === "newest") {
      raw = [...raw].sort((a, b) => b.updatedEpoch - a.updatedEpoch);
    } else if (sortBy === "oldest") {
      raw = [...raw].sort((a, b) => a.updatedEpoch - b.updatedEpoch);
    } else if (sortBy === "name-asc") {
      raw = [...raw].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      raw = [...raw].sort((a, b) => b.name.localeCompare(a.name));
    }

    const limit = 20;
    const startIndex = (page - 1) * limit;
    const paginated = raw.slice(startIndex, startIndex + limit);

    setTableData(formatSections(paginated));
    setTableTotal(raw.length);
  };

  // Clean filters
  const hasActiveFilters = searchQuery !== "" || selectedStatus !== "All" || sortBy !== "newest";
  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
    setSortBy("newest");
  };

  // Build filter input controls to be supplied to the Structure component
  const filterInputs = (
    <div className="flex items-center gap-12 w-full flex-wrap">
      <div
        className="flex items-center rounded-5 border-tertiary bg-white px-12 py-6"
        style={{ minWidth: "240px", display: "flex", gap: "8px" }}
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          className="text-gray"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search sections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-dark small-text"
          style={{ border: "none", outline: "none", background: "transparent", width: "100%" }}
        />
      </div>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-12 py-8 rounded-5 border-tertiary text-dark small-text bg-white cursor-pointer font-500"
      >
        <option value="All">All Statuses</option>
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
      </select>

      <div className="flex items-center gap-8 ml-auto flex-wrap">
        <span className="small-text text-gray font-500">Sort By:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-12 py-8 rounded-5 border-tertiary text-dark small-text bg-white cursor-pointer font-500"
        >
          <option value="newest">Updated (Newest)</option>
          <option value="oldest">Updated (Oldest)</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>
    </div>
  );

  return (
    <Structure
      sidebarTitle="CMS Sections"
      sidebarItems={sidebarItems}
      selectedSidebarItem={selectedSidebarItem}
      onSidebarItemClick={setSelectedSidebarItem}
      headerIcon={
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      }
      headerTitle="CMS Dashboard"
      headerSub={`${sections.length} sections total • ${sections.filter(s => s.status === "Published").length} published • ${sections.filter(s => s.status === "Draft").length} drafts`}
      quickAction={
        <div className="text-right">
          <p className="mini-text text-gray font-600 uppercase mb-2">QUICK ACTION</p>
          <p
            className="small-text font-600 text-primary flex items-center gap-2 decoration-none cursor-pointer"
            onClick={handleCreateSection}
          >
            Create New Section
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </p>
        </div>
      }
      showTabControls={true}
      tabs={[{ name: "Sections / Pages", count: sections.length }]}
      activeTab="Sections / Pages"
      filterDescription={
        selectedSidebarItem === "All Pages"
          ? "Showing all page sections"
          : `Showing sections in ${selectedSidebarItem}`
      }
      showFilters={showFilters}
      onToggleFilters={() => setShowFilters(!showFilters)}
      filterInputs={filterInputs}
      hasActiveFilters={hasActiveFilters}
      onClearAllFilters={handleClearAllFilters}
    >
      <div className="bg-white">
        <Table
          key={`${selectedSidebarItem}-${searchQuery}-${selectedStatus}-${sortBy}-${sections.length}`}
          columns={columns}
          data={tableData}
          total={tableTotal}
          limit={20}
          fetchData={handleFetchData}
        />
      </div>

      {/* Edit / Create Section Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalMode === "create" ? "Create New Section" : "Edit Section"}
        width="w-35"
        bodyHeight="h-auto"
      >
        <form onSubmit={handleFormSubmit} className="grid-cols-1 gap-12 p-8">
          <div className="grid-cols-1 gap-4">
            <label className="small-text font-600 text-dark">Section Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Home Hero Section"
              className="w-full h-input border-ec rounded-5 text-dark small-text"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                if (modalMode === "create") {
                  setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }
              }}
            />
          </div>

          <div className="grid-cols-1 gap-4">
            <label className="small-text font-600 text-dark">Key / Slug *</label>
            <input
              type="text"
              required
              placeholder="e.g. home-hero"
              className="w-full h-input border-ec rounded-5 text-dark small-text"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
            />
          </div>

          <div className="grid-cols-1 gap-4">
            <label className="small-text font-600 text-dark">Description</label>
            <input
              type="text"
              placeholder="e.g. Top banner section on homepage."
              className="w-full h-input border-ec rounded-5 text-dark small-text"
              value={formSub}
              onChange={(e) => setFormSub(e.target.value)}
            />
          </div>

          <div className="grid-cols-1 gap-4">
            <label className="small-text font-600 text-dark">Page Scope</label>
            <select
              className="w-full h-input border-ec rounded-5 text-dark small-text bg-white cursor-pointer"
              value={formPage}
              onChange={(e) => setFormPage(e.target.value)}
            >
              <option value="Homepage Sections">Homepage Sections</option>
              <option value="Global Sections">Global Sections</option>
            </select>
          </div>

          <div className="grid-cols-1 gap-4">
            <label className="small-text font-600 text-dark">Status</label>
            <select
              className="w-full h-input border-ec rounded-5 text-dark small-text bg-white cursor-pointer"
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="grid-cols-1 gap-4">
            <label className="small-text font-600 text-dark">Thumbnail Image URL</label>
            <input
              type="text"
              placeholder="e.g. https://images.unsplash.com/..."
              className="w-full h-input border-ec rounded-5 text-dark small-text"
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-8 mt-16">
            <Button
              version="v1"
              bg="white"
              color="gray"
              border="gray"
              type="button"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              version="v1"
              bg="primary"
              color="white"
              border="primary"
              type="submit"
            >
              {modalMode === "create" ? "Create Section" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>
    </Structure>
  );
};

export default CMS;