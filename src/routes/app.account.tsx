import { createFileRoute } from "@tanstack/react-router";
import { Plus, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

import {
  AppButton,
  ArrowLink,
  Badge,
  DefList,
  PageHead,
  Panel,
  PanelBody,
  PanelFoot,
  PanelHead,
  Person,
  Td,
  TableWrap,
  Th,
  appButtonClass,
} from "@/components/app/ui";
import { Switch } from "@/components/ui/switch";
import { notificationPrefs, team, workspace } from "@/lib/app-data";
import { demo } from "@/lib/demo";

export const Route = createFileRoute("/app/account")({
  head: () => ({ meta: [{ title: "Account | ELITƎ workspace" }] }),
  component: Account,
});

/** Matches `SearchField`'s input treatment so every workspace field reads alike. */
const inputClass =
  "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-gold";

/** The prototype validated on submit only, so errors appear after the first attempt. */
const emailPattern = /.+@.+\..+/;

type Profile = { name: string; email: string; phone: string; lang: string };

function Account() {
  /* The profile form is controlled: the prototype's `novalidate` + `data-validate`
     pass becomes explicit state so error copy renders inline. */
  const [profile, setProfile] = useState<Profile>({
    name: workspace.user.name,
    email: workspace.user.email,
    phone: workspace.user.phone,
    lang: "English",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  /* One boolean per preference, seeded from the demo data. */
  const [notify, setNotify] = useState<boolean[]>(notificationPrefs.map((pref) => pref.on));

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!profile.name.trim()) next.name = "Enter your full name.";
    if (!emailPattern.test(profile.email.trim())) {
      next.email = "Enter a valid email, like name@company.com.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) demo("Profile saved");
  }

  return (
    <>
      <PageHead
        crumbs={[{ label: "Dashboard", to: "/app" }, { label: "Account" }]}
        title="Account"
        lede="Your profile, your team and how this workspace behaves."
      />

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid content-start gap-5">
          <Panel>
            <PanelHead title="Profile" />
            <PanelBody>
              <div className="flex flex-wrap items-center gap-5">
                <Person
                  size="xl"
                  avatar={workspace.user.avatar}
                  name={workspace.user.name}
                  meta={`${workspace.user.role} · ${workspace.org}`}
                />
                <AppButton size="sm" onClick={() => demo("Opening the photo uploader")}>
                  Change photo
                </AppButton>
              </div>

              <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="acc-name" className="text-xs font-semibold text-muted-foreground">
                    Full name
                  </label>
                  <input
                    id="acc-name"
                    className={inputClass}
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "acc-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="acc-name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="acc-email"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Work email
                  </label>
                  <input
                    id="acc-email"
                    type="email"
                    className={inputClass}
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "acc-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="acc-email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="acc-phone"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Mobile
                  </label>
                  <input
                    id="acc-phone"
                    type="tel"
                    className={inputClass}
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                    aria-describedby="acc-phone-hint"
                  />
                  <p id="acc-phone-hint" className="text-xs text-muted-foreground">
                    Used for campaign alerts only.
                  </p>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="acc-lang" className="text-xs font-semibold text-muted-foreground">
                    Interface language
                  </label>
                  <select
                    id="acc-lang"
                    className={inputClass}
                    value={profile.lang}
                    onChange={(e) => setProfile((p) => ({ ...p, lang: e.target.value }))}
                  >
                    <option value="English">English</option>
                    <option value="العربية">العربية</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" className={appButtonClass("primary")}>
                    Save changes
                  </button>
                </div>
              </form>
            </PanelBody>
          </Panel>

          <Panel id="team">
            <PanelHead
              title="Team & permissions"
              sub={`${team.length} people can see this workspace`}
              actions={
                <AppButton size="sm" onClick={() => demo("Opening the invite form")}>
                  <Plus className="size-4" /> Invite
                </AppButton>
              }
            />
            <PanelBody flush>
              <TableWrap>
                <caption className="sr-only">People with access to this workspace</caption>
                <thead>
                  <tr>
                    <Th>Person</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>
                      <span className="sr-only">Actions</span>
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((member) => (
                    <tr key={member.email}>
                      <Td>
                        <Person avatar={member.avatar} name={member.name} />
                      </Td>
                      <Td className="text-muted-foreground">{member.email}</Td>
                      <Td className="w-px whitespace-nowrap">
                        <Badge tone={member.tone}>{member.role}</Badge>
                      </Td>
                      <Td className="w-px whitespace-nowrap text-end">
                        <AppButton
                          tone="quiet"
                          size="sm"
                          onClick={() => demo(`Editing permissions for ${member.name}`)}
                        >
                          Edit
                        </AppButton>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            </PanelBody>
          </Panel>
        </div>

        <div id="settings" className="grid content-start gap-5">
          <Panel>
            <PanelHead title="Notifications" />
            <PanelBody className="grid gap-5">
              {notificationPrefs.map((pref, i) => {
                const id = `acc-notify-${i}`;
                return (
                  <div key={pref.label} className="flex items-center justify-between gap-4">
                    <label htmlFor={id} className="flex-1 cursor-pointer text-sm">
                      {pref.label}
                    </label>
                    <Switch
                      id={id}
                      checked={notify[i] ?? false}
                      onCheckedChange={(on) =>
                        setNotify((prev) => prev.map((was, j) => (j === i ? on : was)))
                      }
                    />
                  </div>
                );
              })}
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHead title="Workspace" />
            <PanelBody>
              <DefList
                rows={[
                  ["Organisation", workspace.org],
                  ["Plan", workspace.plan],
                  ["Branches", workspace.branchCount],
                  ["ELITƎ manager", workspace.manager],
                ]}
              />
            </PanelBody>
            <PanelFoot>
              <ArrowLink to="/contact">Contact support</ArrowLink>
            </PanelFoot>
          </Panel>

          <Panel>
            <PanelHead title="Demo mode" sub="Nothing here is saved" />
            <PanelBody className="grid gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This workspace runs entirely in your browser with sample data. Explore every screen
                freely — pages, campaigns and reports reset when you reload.
              </p>
              <AppButton block onClick={() => demo("Restoring the original sample data")}>
                <RotateCcw className="size-4" /> Reset sample data
              </AppButton>
            </PanelBody>
            <PanelFoot>
              <ArrowLink to="/">Return to the ELIT&#410; site</ArrowLink>
            </PanelFoot>
          </Panel>
        </div>
      </div>
    </>
  );
}
