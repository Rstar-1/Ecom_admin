import React, { useState, useMemo } from "react";
import Structure from "../../components/layout/Structure";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Icon from "../../components/common/Icon";

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
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter and sort computation
  const filteredSections = useMemo(() => {
    let raw = sections;
    if (selectedSidebarItem !== "All Pages") {
      raw = raw.filter(s => s.page === selectedSidebarItem);
    }
    if (selectedStatus !== "All") {
      raw = raw.filter(s => s.status === selectedStatus);
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      raw = raw.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q) ||
          s.sub.toLowerCase().includes(q)
      );
    }
    if (sortBy === "newest") {
      raw = [...raw].sort((a, b) => b.updatedEpoch - a.updatedEpoch);
    } else if (sortBy === "oldest") {
      raw = [...raw].sort((a, b) => a.updatedEpoch - b.updatedEpoch);
    } else if (sortBy === "name-asc") {
      raw = [...raw].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      raw = [...raw].sort((a, b) => b.name.localeCompare(a.name));
    }
    return raw;
  }, [sections, selectedSidebarItem, selectedStatus, searchQuery, sortBy]);

  const itemsPerPage = 10;
  const paginatedSections = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSections.slice(start, start + itemsPerPage);
  }, [filteredSections, currentPage, itemsPerPage]);

  // Standard Table column configuration
  const columns = [
    {
      header: "Section / Page",
      accessor: "name",
      style: { minWidth: "250px" },
      ui: "profile",
      imgStyle: { width: "96px", height: "54px", objectFit: "cover", borderRadius: "5px", flexShrink: 0 }
    },
    {
      header: "Key / Slug",
      accessor: "slug",
      ui: "text",
      style: { minWidth: "140px" }
    },
    {
      header: "Status",
      accessor: "status",
      ui: "badge",
      style: { minWidth: "100px" }
    },
    {
      header: "Updated",
      accessor: "updated",
      style: { minWidth: "140px" },
      render: (s) => (
        <div className="grid-cols-1 mini-text text-dark font-500">
          <div>{s.updated.split(" ").slice(0, 3).join(" ")}</div>
          <div className="text-gray">{s.updated.split(" ").slice(3).join(" ")}</div>
        </div>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      className: "text-center",
      style: { minWidth: "100px" },
      render: (s) => (
        <div className="flex gap-8 justify-center">
          <Button
            version="v2"
            bg="white"
            color="primary"
            border="primary"
            className="p-6 cursor-pointer"
            onClick={() => handleEdit(s.id)}
          >
            <Icon name="Edit" width="14" height="14" strokeWidth="2.5" />
          </Button>
          <Button
            version="v2"
            bg="white"
            color="danger"
            border="danger"
            className="p-6 cursor-pointer"
            onClick={() => handleDelete(s.id)}
          >
            <Icon name="Trash" width="14" height="14" strokeWidth="2.5" />
          </Button>
        </div>
      )
    }
  ];

  // Clean filters
  const hasActiveFilters = searchQuery !== "" || selectedStatus !== "All" || sortBy !== "newest";
  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Build filter input controls to be supplied to the Structure component
  const filterInputs = (
    <div className="flex items-center gap-12 w-full flex-wrap">
      <div
        className="flex items-center rounded-5 border-tertiary bg-white px-12 py-6"
        style={{ minWidth: "240px", display: "flex", gap: "8px" }}
      >
        <Icon name="Search" width="14" height="14" strokeWidth="2.5" className="text-gray" />
        <input
          type="text"
          placeholder="Search sections..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className="text-dark small-text"
          style={{ border: "none", outline: "none", background: "transparent", width: "100%" }}
        />
      </div>

      <select
        value={selectedStatus}
        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
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
          onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
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
      onSidebarItemClick={(item) => { setSelectedSidebarItem(item); setCurrentPage(1); }}
      headerIcon={
        <Icon name="Layers" width="20" height="20" strokeWidth="2.5" className="text-primary flex" />
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
            <Icon name="ChevronRight" width="14" height="14" strokeWidth="2.5" className="flex" />
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
          columns={columns}
          data={paginatedSections}
          totalItems={filteredSections.length}
          itemsPerPage={itemsPerPage}
          page={currentPage}
          onPageChange={(p) => setCurrentPage(p)}
          showControls={false}
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