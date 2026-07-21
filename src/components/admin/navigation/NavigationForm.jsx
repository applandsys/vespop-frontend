"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import { getNavigation } from "@/services/navigation/NavigationService";
import { getAllCategories } from "@/services/ecommerce/getCategories";

/* --------------------------------------------
   Helper: flatten tree -> flat list
--------------------------------------------- */
const flattenMenus = (items = []) => {
    let result = [];

    items.forEach((item) => {
        const { childrens, ...rest } = item;
        result.push(rest);

        if (childrens?.length) {
            result = result.concat(flattenMenus(childrens));
        }
    });

    return result;
};

export default function NavigationForm({ initialData, onSubmit }) {
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategorySlug, setSelectedCategorySlug] = useState("");

    const [form, setForm] = useState({
        label: "",
        slug: "",
        url: "",
        position: "header",
        parentLevel1: "",   // top-level
        parentLevel2: "",   // second-level
        parentId: null,     // final saved parent
        icon: "",
        cssClasses: "",
        textColor: "",
        type: "page",
    });

    /* --------------------------------------------
       Fetch & normalize navigation
    --------------------------------------------- */
    useEffect(() => {
        getNavigation()
            .then((res) => {
                const flat = flattenMenus(res.data || []);
                setMenus(flat);
            })
            .catch(console.error);

        getAllCategories()
            .then((res) => setCategories(res || []))
            .catch(console.error);

        if (initialData) {
            setForm((prev) => ({
                ...prev,
                ...initialData,
                parentLevel1: initialData.parentId || "",
            }));
        }
    }, [initialData]);

    /* --------------------------------------------
       Restore selected category (edit mode) once categories load
    --------------------------------------------- */
    useEffect(() => {
        if (form.type === "category" && form.url && categories.length) {
            const match = categories.find((c) => `/${c.slug}` === form.url);
            if (match) setSelectedCategorySlug(match.slug);
        }
    }, [categories, form.type, form.url]);

    const handleCategorySelect = (slug) => {
        setSelectedCategorySlug(slug);
        handleChange("url", `/${slug}`);
    };

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    /* --------------------------------------------
       Level calculations
    --------------------------------------------- */
    const level1Menus = useMemo(
        () => menus.filter((m) => m.parentId === null),
        [menus]
    );

    const level2Menus = useMemo(
        () =>
            menus.filter(
                (m) => String(m.parentId) === String(form.parentLevel1)
            ),
        [menus, form.parentLevel1]
    );

    /* --------------------------------------------
       Submit
    --------------------------------------------- */
    const handleSubmit = (e) => {
        e.preventDefault();

        const finalParentId =
            form.parentLevel2 || form.parentLevel1 || null;

        onSubmit({
            ...form,
            parentId: finalParentId,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

            {/* Label */}
            <div>
                <Label>Menu Label</Label>
                <Input
                    value={form.label}
                    onChange={(e) => handleChange("label", e.target.value)}
                    required
                />
            </div>

            {/* Slug */}
            <div>
                <Label>Slug</Label>
                <Input
                    value={form.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    required
                />
            </div>

            {/* URL */}
            <div>
                <Label>URL</Label>
                <Input
                    value={form.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    required
                />
            </div>

            {/* Position */}
            <div>
                <Label>Position</Label>
                <Select
                    value={form.position}
                    onValueChange={(v) => handleChange("position", v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="header">Header</SelectItem>
                        <SelectItem value="footer">Footer</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* LEVEL 1 */}
            <div>
                <Label>Parent Menu (Level 1)</Label>
                <Select
                    value={form.parentLevel1}
                    onValueChange={(v) => {
                        handleChange("parentLevel1", v);
                        handleChange("parentLevel2", "");
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Top level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Top Level</SelectItem>
                        {level1Menus.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* LEVEL 2 */}
            {form.parentLevel1 && (
                <div>
                    <Label>Sub Parent Menu (Level 2)</Label>
                    <Select
                        value={form.parentLevel2}
                        onValueChange={(v) => handleChange("parentLevel2", v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select sub parent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {level2Menus.map((item) => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Type */}
            <div>
                <Label>Type</Label>
                <Select
                    value={form.type}
                    onValueChange={(v) => {
                        handleChange("type", v);
                        if (v !== "category") setSelectedCategorySlug("");
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="page">Page</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Category (only when Type = Category) */}
            {form.type === "category" && (
                <div>
                    <Label>Category</Label>
                    <Select
                        value={selectedCategorySlug}
                        onValueChange={handleCategorySelect}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.slug}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {/* Icon */}
            <div>
                <Label>Icon</Label>
                <Input
                    value={form.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                />
            </div>

            {/* CSS Classes */}
            <div>
                <Label>CSS Classes</Label>
                <Input
                    value={form.cssClasses}
                    onChange={(e) => handleChange("cssClasses", e.target.value)}
                />
            </div>

            {/* Text Color */}
            <div>
                <Label>Text Color</Label>
                <Input
                    value={form.textColor}
                    onChange={(e) => handleChange("textColor", e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full">
                Save Navigation
            </Button>
        </form>
    );
}