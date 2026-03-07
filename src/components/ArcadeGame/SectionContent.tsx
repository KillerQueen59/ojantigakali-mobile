"use client";

import { useState } from "react";
import {
  MapPin,
  Globe,
  Zap,
  Code,
  Coffee,
  Mail,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import portfolioData from "@/data/portfolio";
import type { ThemeConfig, ThemeMenuItem } from "@/types/theme";
import { ImageCarousel } from "./ImageCarousel";
import {
  PixelDivider,
  StatBar,
  ArcadeBadge,
  ScanlineCard,
  LevelTag,
  BulletPoint,
} from "./shared";

type MenuId = ThemeMenuItem["id"];

export function SectionContent({
  id,
  theme,
}: {
  id: MenuId;
  theme: ThemeConfig;
}) {
  const c = theme.colors;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const heading = (text: string, clr = c.primary) => (
    <div className="flex items-center gap-2.5 mb-[18px]">
      <div
        className="w-2 h-2 rounded-sm"
        style={{
          background: clr,
          boxShadow: `0 0 8px ${clr}88`,
          animation: "dotPulse 2s ease-in-out infinite",
        }}
      />
      <div
        className="text-[13px] tracking-[0.08em]"
        style={{
          color: clr,
          textShadow: `0 0 8px ${clr}66`,
        }}
      >
        {text}
      </div>
      <div className="flex-1 h-px" style={{ background: `${clr}33` }} />
    </div>
  );

  const dim = (text: string) => (
    <span className="text-[9px] tracking-[0.1em]" style={{ color: c.textDim }}>
      {text}
    </span>
  );

  const d = portfolioData;

  if (id === "about") {
    return (
      <div
        className="font-arcade text-[11px] leading-[2.4]"
        style={{ color: c.text }}
      >
        {heading("PLAYER 1 — ABOUT ME")}
        <ScanlineCard color={c.primary} glow>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-[42px] h-[42px] rounded-md flex items-center justify-center font-arcade text-[16px]"
              style={{
                background: `linear-gradient(135deg, ${c.primary}33, ${c.secondary}33)`,
                border: `2px solid ${c.primary}66`,
                color: c.primary,
              }}
            >
              P1
            </div>
            <div>
              <div className="text-white text-[13px] mb-1">{d.about.name}</div>
              <ArcadeBadge text={d.about.title} color={c.secondary} />
            </div>
          </div>
          <PixelDivider color={c.primary} style="line" />
          <div className="text-[#bbb] text-[9px] leading-[2.2]">
            {d.about.bio}
          </div>
        </ScanlineCard>

        <PixelDivider color={c.dot} />

        {d.about.facts.map((f, i) => (
          <ScanlineCard
            key={f.key}
            color={[c.primary, c.secondary, c.text, c.score, c.dot][i % 5]}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-5 h-5 rounded-[4px] flex items-center justify-center font-arcade text-[7px]"
                style={{
                  background: `${[c.primary, c.secondary, c.text, c.score, c.dot][i % 5]}22`,
                  border: `1px solid ${[c.primary, c.secondary, c.text, c.score, c.dot][i % 5]}44`,
                  color: [c.primary, c.secondary, c.text, c.score, c.dot][
                    i % 5
                  ],
                }}
              >
                {f.icon === "MapPin" ? (
                  <MapPin size={10} />
                ) : f.icon === "Globe" ? (
                  <Globe size={10} />
                ) : f.icon === "Zap" ? (
                  <Zap size={10} />
                ) : f.icon === "Code" ? (
                  <Code size={10} />
                ) : (
                  <Coffee size={10} />
                )}
              </div>
              {dim(f.key.toUpperCase())}
            </div>
            <div className="text-[10px] leading-[2]" style={{ color: c.text }}>
              {f.value}
            </div>
          </ScanlineCard>
        ))}
      </div>
    );
  }

  if (id === "experience") {
    return (
      <div
        className="font-arcade text-[11px] leading-[2.4]"
        style={{ color: c.text }}
      >
        {heading("LEVEL HISTORY — EXPERIENCE")}
        {d.experiences.map((exp, i) => (
          <div key={i}>
            <ScanlineCard
              color={[c.primary, c.secondary, c.text][i % 3]}
              glow={i === 0}
            >
              {i === 0 && (
                <div className="flex justify-end mb-2">
                  <ArcadeBadge text="CURRENT" color={c.score} />
                </div>
              )}
              <div
                className="text-[12px] mb-1.5"
                style={{ color: [c.primary, c.secondary, c.text][i % 3] }}
              >
                {exp.role}
              </div>
              <div className="text-[10px] mb-1" style={{ color: c.secondary }}>
                {exp.company}
              </div>
              <div className="text-[9px] mb-3" style={{ color: c.textDim }}>
                {exp.period} · {exp.location}
              </div>
              <PixelDivider
                color={[c.primary, c.secondary, c.text][i % 3]}
                style="line"
              />
              {exp.points.map((p, j) => (
                <BulletPoint
                  key={j}
                  color={[c.primary, c.secondary, c.text][i % 3]}
                >
                  {p}
                </BulletPoint>
              ))}
            </ScanlineCard>
            {i < d.experiences.length - 1 && (
              <PixelDivider color={c.dot} style="arrow" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (id === "projects") {
    const projectColors = [
      c.primary,
      c.secondary,
      "#00ffff",
      c.score,
      c.text,
      "#ff69b4",
    ];
    return (
      <div
        className="font-arcade text-[11px] leading-[2.4]"
        style={{ color: c.text }}
      >
        {heading("BONUS STAGES — PROJECTS")}
        {d.projects.map((proj, i) => {
          const pc = projectColors[i % projectColors.length];
          return (
            <div key={i}>
              <ScanlineCard color={pc} glow>
                <div className="flex justify-end mb-2">
                  <ArcadeBadge text={proj.type.toUpperCase()} color={pc} />
                </div>
                <div className="text-[13px] mb-1.5" style={{ color: pc }}>
                  {proj.name}
                </div>
                {proj.location && (
                  <div
                    className="text-[9px] mb-2 flex items-center gap-1"
                    style={{ color: c.textDim }}
                  >
                    <MapPin size={10} /> {proj.location}
                    {proj.countryCode ? ` (${proj.countryCode})` : ""}
                  </div>
                )}
                {proj.images && proj.images.length > 0 && (
                  <ImageCarousel
                    images={proj.images}
                    color={pc}
                    name={proj.name}
                  />
                )}
                <div className="text-[#bbb] text-[9px] leading-[2.2] mb-3">
                  {proj.desc}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {proj.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[8px] rounded-[4px] px-2 py-[3px] tracking-[0.05em]"
                      style={{
                        color: pc,
                        border: `1px solid ${pc}55`,
                        background: `${pc}11`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <PixelDivider color={pc} style="line" />
                {proj.highlights.map((h, j) => (
                  <BulletPoint key={j} color={pc}>
                    {h}
                  </BulletPoint>
                ))}
                {proj.url && proj.url !== "#" && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 py-2 px-3 rounded-md font-arcade text-[8px] text-center tracking-[0.08em] block no-underline"
                    style={{
                      background: `${pc}11`,
                      border: `1px solid ${pc}33`,
                      color: pc,
                    }}
                  >
                    🔗 {proj.url.replace("https://", "").replace("www.", "")}
                  </a>
                )}
              </ScanlineCard>
              {i < d.projects.length - 1 && (
                <PixelDivider color={c.dot} style="dots" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (id === "education") {
    return (
      <div
        className="font-arcade text-[11px] leading-[2.4]"
        style={{ color: c.text }}
      >
        {heading("SKILL TREE — EDUCATION")}
        {d.education.education.map((edu, i) => (
          <div key={i}>
            <ScanlineCard color={c.secondary} glow={i === 0}>
              <LevelTag
                level={d.education.education.length - i}
                color={c.secondary}
              />
              <div className="text-[12px] mb-1.5" style={{ color: c.primary }}>
                {edu.degree}
              </div>
              <div className="text-[10px] mb-1" style={{ color: c.secondary }}>
                {edu.school}
              </div>
              <div className="text-[9px] mb-2" style={{ color: c.textDim }}>
                {edu.period} · {edu.location}
              </div>
              {edu.gpa && (
                <>
                  <PixelDivider color={c.score} style="line" />
                  <StatBar
                    label="GPA"
                    value={parseFloat(edu.gpa)}
                    max={4.0}
                    color={c.score}
                    dimColor={c.textDim}
                  />
                </>
              )}
              <PixelDivider color={c.secondary} style="line" />
              {edu.highlights.map((h, j) => (
                <BulletPoint key={j} color={c.secondary}>
                  {h}
                </BulletPoint>
              ))}
            </ScanlineCard>
            {i < d.education.education.length - 1 && (
              <PixelDivider color={c.dot} style="arrow" />
            )}
          </div>
        ))}

        {d.education.achievements.length > 0 && (
          <>
            <PixelDivider color={c.score} />
            {heading("ACHIEVEMENTS", c.score)}
            {d.education.achievements.map((a, i) => (
              <div key={i}>
                <ScanlineCard color={c.score} glow>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-arcade text-[16px]">🏆</span>
                    <ArcadeBadge text={a.year} color={c.score} />
                  </div>
                  <div
                    className="text-[11px] mb-1.5"
                    style={{ color: c.score }}
                  >
                    {a.name}
                  </div>
                  <div
                    className="text-[9px] mb-2 leading-[2]"
                    style={{ color: c.secondary }}
                  >
                    {a.org}
                  </div>
                  {a.stack && (
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {a.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[7px] rounded-[3px] px-1.5 py-0.5"
                          style={{
                            color: c.score,
                            border: `1px solid ${c.score}44`,
                            background: `${c.score}11`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {a.desc && (
                    <>
                      <PixelDivider color={c.score} style="line" />
                      <div className="text-[#bbb] text-[9px] leading-[2.2]">
                        {a.desc}
                      </div>
                    </>
                  )}
                  {a.highlights && a.highlights.length > 0 && (
                    <>
                      <PixelDivider color={c.score} style="line" />
                      {a.highlights.map((h, j) => (
                        <BulletPoint key={j} color={c.score}>
                          {h}
                        </BulletPoint>
                      ))}
                    </>
                  )}
                </ScanlineCard>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  if (id === "contact") {
    const contactItems = [
      {
        label: "EMAIL",
        value: d.contact.email,
        copyValue: d.contact.email,
        icon: <Mail size={16} />,
        color: c.primary,
      },
      {
        label: "LOCATION",
        value: d.contact.location,
        copyValue: d.contact.location,
        icon: <MapPin size={16} />,
        color: c.text,
        noCopy: true,
      },
      {
        label: "GITHUB",
        value: d.contact.github.replace("https://", ""),
        copyValue: d.contact.github,
        icon: <Github size={16} />,
        color: c.secondary,
        link: d.contact.github,
      },
      {
        label: "LINKEDIN",
        value: d.contact.linkedin.replace("https://www.", ""),
        copyValue: d.contact.linkedin,
        icon: <Linkedin size={16} />,
        color: "#0077b5",
        link: d.contact.linkedin,
      },
    ];
    const handleCopy = (label: string, value: string) => {
      navigator.clipboard.writeText(value);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 1500);
    };
    return (
      <div
        className="font-arcade text-[11px] leading-[2.4]"
        style={{ color: c.text }}
      >
        {heading("BONUS FRUIT — CONTACT")}
        {contactItems.map((item) => (
          <ScanlineCard key={item.label} color={item.color}>
            <div className="flex items-center gap-2.5">
              <span style={{ color: item.color }}>{item.icon}</span>
              <div className="flex-1 min-w-0">
                {dim(item.label)}
                <div
                  className="text-[10px] leading-[2] break-all"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-[4px] flex items-center justify-center no-underline"
                    style={{
                      border: `1px solid ${item.color}44`,
                      background: `${item.color}11`,
                      color: item.color,
                    }}
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
                {!item.noCopy && (
                  <button
                    onClick={() => handleCopy(item.label, item.copyValue)}
                    className="w-7 h-7 rounded-[4px] flex items-center justify-center cursor-pointer transition-all duration-200"
                    style={{
                      border: `1px solid ${copiedItem === item.label ? c.score : item.color}44`,
                      background:
                        copiedItem === item.label
                          ? `${c.score}22`
                          : `${item.color}11`,
                      color: copiedItem === item.label ? c.score : item.color,
                    }}
                  >
                    {copiedItem === item.label ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </ScanlineCard>
        ))}

        <PixelDivider color={c.secondary} />
        {heading("GITHUB STATS", c.secondary)}
        <ScanlineCard color={c.secondary} glow>
          <div className="flex items-center gap-2.5 mb-3.5">
            <span style={{ color: c.secondary }}>
              <Github size={20} />
            </span>
            <div>
              <div className="text-[12px]" style={{ color: c.primary }}>
                {d.github.username}
              </div>
              <div className="text-[8px]" style={{ color: c.textDim }}>
                GITHUB PROFILE
              </div>
            </div>
          </div>
          <StatBar
            label="REPOS"
            value={d.github.repos}
            max={100}
            color={c.primary}
            dimColor={c.textDim}
          />
          <StatBar
            label="STARS"
            value={d.github.stars}
            max={50}
            color={c.score}
            dimColor={c.textDim}
          />
          <StatBar
            label="FOLLOWERS"
            value={d.github.followers}
            max={100}
            color={c.secondary}
            dimColor={c.textDim}
          />
        </ScanlineCard>

        {d.github.pinned.length > 0 && (
          <>
            {heading("PINNED REPOS", c.primary)}
            {d.github.pinned.map((repo) => (
              <ScanlineCard key={repo.name} color={repo.color}>
                <div className="flex justify-between items-start mb-1.5">
                  <div className="text-[11px]" style={{ color: repo.color }}>
                    {repo.name}
                  </div>
                  <ArcadeBadge text={repo.lang} color={repo.color} />
                </div>
                <div className="text-[#bbb] text-[9px] leading-[2]">
                  {repo.desc}
                </div>
              </ScanlineCard>
            ))}
          </>
        )}
      </div>
    );
  }

  if (id === "resume") {
    return (
      <div
        className="font-arcade text-[11px] leading-[2.4]"
        style={{ color: c.text }}
      >
        {heading("POWER PELLET — RESUME")}
        <ScanlineCard color={c.primary} glow>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-[42px] h-[42px] rounded-md flex items-center justify-center font-arcade text-[16px]"
              style={{
                background: `linear-gradient(135deg, ${c.primary}33, ${c.score}33)`,
                border: `2px solid ${c.primary}66`,
                color: c.primary,
              }}
            >
              CV
            </div>
            <div>
              <div className="text-white text-[13px] mb-1">{d.resume.name}</div>
              <div className="text-[8px]" style={{ color: c.secondary }}>
                {d.resume.subtitle}
              </div>
            </div>
          </div>
          <PixelDivider color={c.primary} style="line" />
          <div className="text-[#bbb] text-[9px] leading-[2.2]">
            {d.resume.summary}
          </div>
        </ScanlineCard>

        <PixelDivider color={c.dot} />
        {heading("EXPERIENCE", c.secondary)}

        <div
          className="ml-2 pl-4"
          style={{ borderLeft: `2px solid ${c.secondary}44` }}
        >
          {d.resume.experiences.map((exp, i) => (
            <div key={i} className="relative mb-4">
              <div
                className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
                style={{
                  background: i === 0 ? c.primary : `${c.primary}44`,
                  border: `2px solid ${c.primary}`,
                  boxShadow: i === 0 ? `0 0 8px ${c.primary}66` : "none",
                }}
              />
              <div className="text-[10px]" style={{ color: c.primary }}>
                {exp.role}
              </div>
              <div className="text-[9px]" style={{ color: c.secondary }}>
                {exp.company}
              </div>
              <div className="text-[8px]" style={{ color: c.textDim }}>
                {exp.period}
              </div>
            </div>
          ))}
        </div>

        <PixelDivider color={c.dot} />
        {heading("SKILLS", c.score)}
        <ScanlineCard color={c.score}>
          <div className="flex flex-wrap gap-1.5">
            {d.resume.skills.split(" · ").map((skill) => (
              <span
                key={skill}
                className="text-[8px] rounded-[4px] px-2 py-1 tracking-[0.05em]"
                style={{
                  color: c.score,
                  border: `1px solid ${c.score}44`,
                  background: `${c.score}11`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </ScanlineCard>

        <PixelDivider color={c.primary} />
        <a
          href="/files/10282025 CV_Muhammad Fauzan Ramadhan.pdf"
          download="CV_Muhammad Fauzan Ramadhan.pdf"
          className="flex items-center justify-center gap-2.5 py-3.5 rounded-md no-underline font-arcade text-[11px] tracking-[0.1em]"
          style={{
            background: `linear-gradient(135deg, ${c.primary}22, ${c.score}22)`,
            border: `2px solid ${c.primary}66`,
            color: c.primary,
            boxShadow: `0 0 12px ${c.primary}33`,
          }}
        >
          <Download size={14} />
          DOWNLOAD CV
        </a>
      </div>
    );
  }

  return null;
}
