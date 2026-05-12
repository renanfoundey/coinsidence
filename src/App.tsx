import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Switch,
  Link,
  IconButton,
  Avatar,
  Container,
  InputAdornment,
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import PrintIcon from '@mui/icons-material/Print'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import TerminalIcon from '@mui/icons-material/Terminal'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useState } from 'react'
import './App.css'

const YELLOW = '#F5C400'
const LINK_RED = '#B71C1C'
const PAGE_BG = '#f0f0f0'

interface ArticleData {
  providerId: string
  date: string
  source: string
  lists: string[]
  listSource: string
  url: string
  content: string[]
}

interface IdRow {
  type: string
  number: string
  country?: string
  issueDate?: string
  expDate?: string
}

interface AliasGroup {
  name: string
  ids?: IdRow[]
  weakAkas?: string[]
}

interface PersonData {
  dob: string
  citizenship: string
  lists: string[]
  listSource: string
  aliases: AliasGroup[]
  locations?: string[]
  notes?: string[]
}

interface SearchResult {
  id: number
  type: 'person' | 'article'
  title: string
  subtitle: string
  score: number
  titleRed?: boolean
  article?: ArticleData
  person?: PersonData
}

const MADOFF_PERSON: PersonData = {
  dob: '29 April 1938',
  citizenship: 'United States of America',
  lists: ['Securities Fraud', 'Federal Inmate (Deceased)', 'Adverse Media'],
  listSource: 'US DOJ / SDNY',
  aliases: [
    {
      name: 'Bernard Lawrence Madoff',
      ids: [
        {
          type: 'Federal Bureau of Prisons Register',
          number: '61727-054',
          country: 'United States of America',
        },
        {
          type: 'SDNY Case',
          number: '1:09-cr-00213',
          country: 'United States of America',
          issueDate: '12 March 2009',
        },
      ],
    },
    {
      name: 'Bernie Madoff',
      weakAkas: [
        'Madoff, Bernard - (Strong AKA)',
        'B. L. Madoff - (Weak AKA)',
        'Bernie L. Madoff - (Weak AKA)',
        'Madoff B - (Weak AKA)',
      ],
    },
  ],
  locations: [
    'New York, NY, USA (residence)',
    'Butner FCI, North Carolina, USA (incarceration 2009–2021)',
  ],
  notes: [
    'Convicted June 2009 of 11 federal felonies after operating a $65B Ponzi scheme through Bernard L. Madoff Investment Securities LLC.',
    'Sentenced to 150 years in federal prison; died at Butner FCI on 14 April 2021.',
    'Former chairman of NASDAQ. Public record via SDNY court filings and SEC litigation releases.',
  ],
}

function person(
  id: number,
  title: string,
  subtitle: string,
  score: number,
  override: Partial<PersonData> = {},
): SearchResult {
  return {
    id,
    type: 'person',
    title,
    subtitle,
    score,
    titleRed: true,
    person: { ...MADOFF_PERSON, ...override },
  }
}

const RESULTS: SearchResult[] = [
  person(1, 'Bernard L. Madoff', 'US DOJ — SDNY Court Records', 100),
  person(2, 'Bernard Lawrence Madoff', 'US Federal Bureau of Prisons (Deceased)', 99, {
    listSource: 'US Federal Bureau of Prisons',
    lists: ['Federal Inmate (Deceased)', 'Securities Fraud'],
  }),
  person(3, 'Bernie Madoff', 'SEC Enforcement Action', 98, {
    listSource: 'US SEC Litigation Releases',
    lists: ['SEC Enforcement', 'Securities Fraud'],
  }),
  person(4, 'Bernhard Madoff', 'Adverse Media — Reuters', 95, {
    listSource: 'Reuters Adverse Media',
    lists: ['Adverse Media', 'Financial Crime'],
  }),
  person(5, 'Bernard L Madoff', 'FINRA Disciplinary Action', 96, {
    listSource: 'FINRA BrokerCheck',
    lists: ['Securities Disciplinary', 'Broker Misconduct'],
  }),
  person(6, 'B. L. Madoff', 'NY State Attorney General — Civil Action', 92, {
    listSource: 'NY State Attorney General',
    lists: ['State Enforcement', 'Civil Fraud'],
  }),
  person(7, 'Madoff, Bernard', 'US DOJ — Criminal Complaint', 94, {
    listSource: 'US DOJ',
    lists: ['Criminal Indictment', 'Securities Fraud'],
  }),
  person(8, 'Bernardo L. Madoff', 'Interpol Public Records', 89, {
    listSource: 'Interpol Public Records',
    lists: ['Civil Fraud', 'Adverse Media'],
  }),
  person(9, 'Bernard Madof', 'SIPC — Receivership Filings', 86, {
    listSource: 'Securities Investor Protection Corp',
    lists: ['Receivership', 'Asset Recovery'],
  }),
  person(10, 'Bernie Madow', 'Bloomberg Adverse Media', 81, {
    listSource: 'Bloomberg Adverse Media',
    lists: ['Adverse Media'],
  }),
  person(11, 'Bernard Maddoff', 'US DOJ Asset Forfeiture', 84, {
    listSource: 'US DOJ Asset Forfeiture',
    lists: ['Asset Forfeiture', 'Financial Crime'],
  }),
  person(12, 'Bernard L. Madoffi', 'WSJ Adverse Media', 78, {
    listSource: 'Wall Street Journal Adverse Media',
    lists: ['Adverse Media'],
  }),
  person(13, 'Madoff, Bernard L.', 'US Bankruptcy Court — SDNY', 90, {
    listSource: 'US Bankruptcy Court (SDNY)',
    lists: ['Bankruptcy Filing', 'Receivership'],
  }),
  person(14, 'Mark Madoff', 'Forbes — Notable Persons', 72, {
    listSource: 'Forbes Notable Persons',
    lists: ['Adverse Media', 'Familial Link'],
  }),
  person(15, 'Andrew Madoff', 'FT Adverse Media', 71, {
    listSource: 'Financial Times Adverse Media',
    lists: ['Adverse Media', 'Familial Link'],
  }),
  person(16, 'Peter Madoff', 'AP News Adverse Media', 70, {
    listSource: 'Associated Press Adverse Media',
    lists: ['Adverse Media', 'Familial Link'],
  }),
  person(17, 'Ruth Madoff', 'US Trustee Program — Liquidation', 68, {
    listSource: 'US Trustee Program',
    lists: ['Liquidation', 'Spousal Link'],
  }),
  person(18, 'Bernard L. Madoff', 'PEP — Former NASDAQ Chairman', 86, {
    listSource: 'PEP Registry',
    lists: ['Politically Exposed Person', 'Securities Industry'],
  }),
  person(19, 'Bernard Modoff', 'Class Action Litigation Records', 79, {
    listSource: 'Class Action Public Records',
    lists: ['Civil Litigation', 'Investor Claims'],
  }),
  person(20, 'B. Madoff', 'Adverse Media Aggregate', 80, {
    listSource: 'Adverse Media Aggregate',
    lists: ['Adverse Media'],
  }),
  person(21, 'Bernhard L. Madoff', 'NY Times Adverse Media', 77, {
    listSource: 'New York Times Adverse Media',
    lists: ['Adverse Media'],
  }),
  person(22, 'Bernard L. Madoff', 'Bernard L. Madoff Investment Securities LLC', 82, {
    listSource: 'Entity-Linked Officer Records',
    lists: ['Beneficial Ownership Risk', 'Officer of Defunct Entity'],
  }),
  person(23, 'Bernie Madoff', 'High-Risk Officer Registry', 81, {
    listSource: 'High-Risk Officer Registry',
    lists: ['Officer Risk'],
  }),
  person(24, 'Bernard Madoff', 'Adverse Media — The Economist', 80, {
    listSource: 'The Economist Adverse Media',
    lists: ['Adverse Media'],
  }),
  person(25, 'Bernard L. Madoff', 'Adverse Media — CNBC', 80, {
    listSource: 'CNBC Adverse Media',
    lists: ['Adverse Media'],
  }),
  person(26, 'Madoff, Bernard Lawrence', 'Deceased — Public Death Index', 79, {
    listSource: 'Public Death Index',
    lists: ['Deceased Person'],
  }),
  person(27, 'Bernie Madoff', 'AML Watchlist — Historical', 78, {
    listSource: 'AML Watchlist (Historical)',
    lists: ['AML Watchlist'],
  }),
  person(28, 'Bernard Madoff', 'Treasury Public Litigation Records', 77, {
    listSource: 'US Treasury Public Litigation',
    lists: ['Federal Litigation'],
  }),
  person(29, 'B. Maddof', 'KYC Negative News Aggregate', 73, {
    listSource: 'KYC Negative News',
    lists: ['Negative News'],
  }),
  person(30, 'Bernardo Madov', 'Court Sentencing Records — SDNY', 69, {
    listSource: 'SDNY Sentencing Records',
    lists: ['Sentencing Record'],
  }),
]

function HighlightText({ text, term }: { text: string; term: string }) {
  if (!text.includes(term)) return <>{text}</>
  const parts = text.split(term)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{ color: LINK_RED, fontWeight: 500 }}>{term}</span>
          )}
        </span>
      ))}
    </>
  )
}

function SidebarLabel({ label }: { label: string }) {
  return (
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: '#888',
        display: 'block',
        mb: 0.25,
        fontSize: '0.63rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {label}
    </Typography>
  )
}

function ArticleDetail({ article, title }: { article: ArticleData; title: string }) {
  return (
    <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0', bgcolor: '#fff' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
          minWidth: 200,
          borderRight: '1px solid #e0e0e0',
          p: 2,
          bgcolor: '#fafafa',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <SidebarLabel label="Provider ID" />
          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>{article.providerId}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <SidebarLabel label="Date" />
          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>{article.date}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <SidebarLabel label="Source" />
          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>{article.source}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <SidebarLabel label="Lists" />
          {article.lists.map((list) => (
            <Typography
              key={list}
              variant="caption"
              sx={{ display: 'block', mb: 0.5, fontSize: '0.72rem', lineHeight: 1.4 }}
            >
              {list}
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <SidebarLabel label="List Source" />
          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>{article.listSource}</Typography>
        </Box>
        <Box>
          <SidebarLabel label="Source URL" />
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '0.63rem', wordBreak: 'break-all', lineHeight: 1.4, display: 'block', mt: 0.5 }}
          >
            {article.url}
          </Link>
        </Box>
      </Box>

      {/* Article Content */}
      <Box sx={{ p: 3, flex: 1, minWidth: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.35, fontSize: '1.05rem' }}>
          {title}
        </Typography>
        {article.content.map((para, i) => (
          <Typography key={i} variant="body2" sx={{ mb: 1.5, lineHeight: 1.65, fontSize: '0.82rem' }}>
            <HighlightText text={para} term="Bernard Madoff" />
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

function ResultRow({
  result,
  expanded,
  onToggle,
}: {
  result: SearchResult
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <Box>
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          px: 2,
          py: 1.25,
          borderBottom: '1px solid #e8e8e8',
          cursor: 'pointer',
          '&:hover': { bgcolor: '#fafafa' },
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#e4e4e4',
            color: '#555',
            width: 34,
            height: 34,
            borderRadius: result.type === 'article' ? '6px' : '50%',
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {result.type === 'article' ? (
            <ArticleIcon sx={{ fontSize: 18 }} />
          ) : (
            <PersonIcon sx={{ fontSize: 18 }} />
          )}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: result.titleRed ? LINK_RED : 'text.primary',
              fontSize: '0.82rem',
              lineHeight: 1.4,
            }}
          >
            {result.title}
          </Typography>
          {result.subtitle && (
            <Typography
              variant="caption"
              sx={{
                color: '#777',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mt: 0.25,
                lineHeight: 1.5,
                fontSize: '0.72rem',
              }}
            >
              {result.subtitle}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{ color: '#555', whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.8rem', mt: 0.25 }}
        >
          Score: {result.score}
        </Typography>

        <Box sx={{ color: '#999', flexShrink: 0, mt: 0.25, display: 'flex', alignItems: 'center' }}>
          {expanded ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
        </Box>
      </Box>

      {expanded && result.article && (
        <ArticleDetail article={result.article} title={result.title} />
      )}
      {expanded && result.person && (
        <PersonDetail person={result.person} />
      )}
    </Box>
  )
}

function PersonDetail({ person }: { person: PersonData }) {
  const [tab, setTab] = useState<'profile' | 'locations' | 'additional'>('profile')

  return (
    <Box sx={{ display: 'flex', borderTop: '1px solid #eee', mt: 1.5, pt: 0 }}>
      {/* Left sidebar */}
      <Box sx={{ width: 180, flexShrink: 0, p: 2, pr: 2.5 }}>
        <SidebarLabel label="Date of Birth" />
        <Typography variant="body2" sx={{ fontSize: '0.78rem', mb: 1.5 }}>
          {person.dob}
        </Typography>
        <SidebarLabel label="Citizenship" />
        <Typography variant="body2" sx={{ fontSize: '0.78rem', mb: 1.5 }}>
          {person.citizenship}
        </Typography>
        <SidebarLabel label="Lists" />
        {person.lists.map((l) => (
          <Typography key={l} variant="body2" sx={{ fontSize: '0.78rem', mb: 0.25 }}>
            {l}
          </Typography>
        ))}
        <Box sx={{ mt: 1.5 }}>
          <SidebarLabel label="List Source" />
          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
            {person.listSource}
          </Typography>
        </Box>
      </Box>

      {/* Right column: tabs + content */}
      <Box sx={{ flex: 1, borderLeft: '1px solid #eee', minWidth: 0 }}>
        <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
          {(
            [
              { id: 'profile', label: 'PROFILE' },
              { id: 'locations', label: 'LOCATIONS' },
              { id: 'additional', label: 'ADDITIONAL INFORMATION' },
            ] as const
          ).map((t) => {
            const active = tab === t.id
            return (
              <Box
                key={t.id}
                onClick={() => setTab(t.id)}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  py: 1.25,
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'text.primary' : '#888',
                  borderBottom: active ? `2px solid ${YELLOW}` : '2px solid transparent',
                  letterSpacing: '0.04em',
                }}
              >
                {t.label}
              </Box>
            )
          })}
        </Box>

        <Box sx={{ p: 2 }}>
          {tab === 'profile' && (
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem' }}
              >
                ALIASES
              </Typography>
              {person.aliases.map((a, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      color: LINK_RED,
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      mb: 1,
                    }}
                  >
                    {a.name}
                  </Typography>

                  {a.ids && a.ids.length > 0 && (
                    <Box sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1.6fr 1.6fr 1.2fr 1fr 1fr',
                          gap: 1.5,
                          pb: 0.75,
                          borderBottom: '1px solid #eee',
                          mb: 1,
                        }}
                      >
                        {['ID Type', 'ID Number', 'Country', 'Issue Date', 'Exp. Date'].map(
                          (h) => (
                            <Typography
                              key={h}
                              sx={{ fontWeight: 700, fontSize: '0.74rem' }}
                            >
                              {h}
                            </Typography>
                          ),
                        )}
                      </Box>
                      {a.ids.map((r, j) => (
                        <Box
                          key={j}
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: '1.6fr 1.6fr 1.2fr 1fr 1fr',
                            gap: 1.5,
                            py: 1,
                            borderBottom: '1px solid #f4f4f4',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Typography sx={{ fontSize: '0.78rem' }}>{r.type}</Typography>
                          <Typography
                            sx={{ fontSize: '0.78rem', wordBreak: 'break-all' }}
                          >
                            {r.number}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem' }}>
                            {r.country ?? ''}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem' }}>
                            {r.issueDate ?? ''}
                          </Typography>
                          <Typography sx={{ fontSize: '0.78rem' }}>
                            {r.expDate ?? ''}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {a.weakAkas && a.weakAkas.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {a.weakAkas.map((w) => (
                        <Typography
                          key={w}
                          sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 0.75 }}
                        >
                          {w}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {tab === 'locations' && (
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem' }}
              >
                KNOWN LOCATIONS
              </Typography>
              {(person.locations ?? []).map((loc) => (
                <Typography key={loc} sx={{ fontSize: '0.82rem', mb: 0.5 }}>
                  {loc}
                </Typography>
              ))}
              {(!person.locations || person.locations.length === 0) && (
                <Typography sx={{ fontSize: '0.82rem', color: '#888' }}>
                  No locations on file.
                </Typography>
              )}
            </Box>
          )}

          {tab === 'additional' && (
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.85rem' }}
              >
                ADDITIONAL INFORMATION
              </Typography>
              {(person.notes ?? []).map((n, i) => (
                <Typography key={i} sx={{ fontSize: '0.82rem', mb: 0.75 }}>
                  {n}
                </Typography>
              ))}
              {(!person.notes || person.notes.length === 0) && (
                <Typography sx={{ fontSize: '0.82rem', color: '#888' }}>
                  No additional information.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

function PaginationControls({
  page,
  pageSize,
  total,
  onPrev,
  onNext,
}: {
  page: number
  pageSize: number
  total: number
  onPrev: () => void
  onNext: () => void
}) {
  const start = total === 0 ? 0 : page * pageSize + 1
  const end = Math.min((page + 1) * pageSize, total)
  const isFirst = page === 0
  const isLast = end >= total
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.72rem' }}>
        Rows per page:&nbsp;{pageSize}
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ mx: 1, fontSize: '0.72rem' }}>
        {start}-{end} of {total}
      </Typography>
      <IconButton size="small" disabled={isFirst} onClick={onPrev} sx={{ p: 0.25 }}>
        <ChevronLeftIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <IconButton size="small" disabled={isLast} onClick={onNext} sx={{ p: 0.25 }}>
        <ChevronRightIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  )
}

const PAGE_SIZE = 5

function App() {
  const [minScore, setMinScore] = useState(50)
  const [fuzzyDOB, setFuzzyDOB] = useState(true)
  const [weakAKAs, setWeakAKAs] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [page, setPage] = useState(0)

  const people = RESULTS.filter((r) => r.type === 'person')
  const totalPages = Math.max(1, Math.ceil(people.length / PAGE_SIZE))
  const pageStart = page * PAGE_SIZE
  const pageEnd = Math.min(pageStart + PAGE_SIZE, people.length)
  const visibleResults = people.slice(pageStart, pageEnd)

  const toggleExpand = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id))

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked': { color: YELLOW },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: YELLOW },
  }

  return (
    <Box sx={{ bgcolor: PAGE_BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── AppBar ── */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: 'white', color: 'black', borderBottom: '1px solid #e0e0e0' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '52px !important', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                bgcolor: '#666',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 800 }}>C</Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
              Coinsidence
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Home', 'Knowledge Base', 'Support'].map((item) => (
              <Link key={item} href="#" underline="none" color="inherit">
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{item}</Typography>
              </Link>
            ))}
          </Box>

          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: YELLOW,
              color: '#000',
              fontWeight: 700,
              fontSize: '0.72rem',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#dba800', boxShadow: 'none' },
            }}
          >
            LOG OUT
          </Button>
        </Toolbar>
      </AppBar>

      {/* ── Secondary Nav ── */}
      <Box
        sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', py: 0.75, textAlign: 'center' }}
      >
        {['Advanced Search', 'Batch Screening', 'Scheduled Screening', 'Audit', 'Reports'].map(
          (item, i, arr) => (
            <span key={item}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  mx: 1,
                  fontSize: '0.8rem',
                  color: i === 0 ? '#1976d2' : '#555',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {item}
              </Link>
              {i < arr.length - 1 && (
                <Typography component="span" sx={{ color: '#ccc', fontSize: '0.8rem' }}>
                  |
                </Typography>
              )}
            </span>
          )
        )}
      </Box>

      {/* ── Main Content ── */}
      <Container maxWidth="md" sx={{ py: 3, flexGrow: 1 }}>
        {/* ── Search Form ── */}
        <Paper elevation={1} sx={{ p: 2.5, mb: 2, borderRadius: '6px' }}>
          <Grid container spacing={1.5}>
            {/* Row 1 */}
            <Grid size={4}>
              <TextField label="Name" defaultValue="Bernard Madoff" size="small" fullWidth />
            </Grid>
            <Grid size={4}>
              <TextField label="ID" size="small" fullWidth />
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Citizenship</InputLabel>
                <Select label="Citizenship" value="">
                  <MenuItem value=""></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Row 2 */}
            <Grid size={4}>
              <TextField
                label="Date of birth"
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <TextField label="Location" size="small" fullWidth />
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select label="Country" value="">
                  <MenuItem value=""></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Row 3 */}
            <Grid size={4}>
              <FormControl fullWidth size="small">
                <InputLabel>List Sources (98)</InputLabel>
                <Select label="List Sources (98)" value="">
                  <MenuItem value=""></MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Lists (1900)</InputLabel>
                <Select label="Lists (1900)" value="">
                  <MenuItem value=""></MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select label="Type" value="">
                  <MenuItem value=""></MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Row 4: Minimum Score + Toggles */}
            <Grid size={12}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                {/* Slider */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.78rem', display: 'block', mb: 0.5 }}>
                    Minimum Score
                  </Typography>
                  <Box sx={{ px: 0.5 }}>
                    <Slider
                      value={minScore}
                      onChange={(_, v) => setMinScore(v as number)}
                      min={0}
                      max={100}
                      sx={{
                        color: '#333',
                        height: 2,
                        py: 0.75,
                        '& .MuiSlider-thumb': {
                          width: 14,
                          height: 14,
                          bgcolor: '#444',
                          '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 6px rgba(0,0,0,0.1)' },
                        },
                        '& .MuiSlider-track': { bgcolor: '#aaa', border: 'none' },
                        '& .MuiSlider-rail': { bgcolor: '#ccc' },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -0.5 }}>
                      <Typography variant="caption" sx={{ fontSize: '0.72rem', color: '#666' }}>50</Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.72rem', color: '#666' }}>100</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Toggles */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 2.5 }}>
                  {[
                    {
                      label: 'FuzzyDOB',
                      checked: fuzzyDOB,
                      onChange: setFuzzyDOB,
                      help:
                        'Match records whose date of birth is within a tolerance window (years/months) of the search input. Use when DOB data is approximate, partially redacted, or only year is known.',
                    },
                    {
                      label: 'WeakAKAs',
                      checked: weakAKAs,
                      onChange: setWeakAKAs,
                      help:
                        'Include low-confidence aliases — transliterations, single-name variants, abbreviations, and phonetic matches. Increases recall but adds noise.',
                    },
                  ].map(({ label, checked, onChange, help }) => (
                    <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                      <Switch
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        size="small"
                        sx={switchSx}
                      />
                      <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>{label}</Typography>
                      <Tooltip title={help} arrow placement="top">
                        <InfoOutlinedIcon
                          sx={{
                            fontSize: 13,
                            color: 'text.secondary',
                            ml: 0.25,
                            cursor: 'help',
                          }}
                        />
                      </Tooltip>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Search Button */}
            <Grid size={12} sx={{ textAlign: 'center', mt: 0.5 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: YELLOW,
                  color: '#000',
                  fontWeight: 700,
                  px: 5,
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#dba800', boxShadow: 'none' },
                }}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* ── Results Panel ── */}
        <Paper elevation={1} sx={{ borderRadius: '6px', overflow: 'hidden' }}>
          {/* Action Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1.5,
              py: 0.75,
              borderBottom: '1px solid #e0e0e0',
              bgcolor: '#fafafa',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {[
                { label: 'START WORKFLOW', icon: null },
                { label: 'AUDIT', icon: null },
                { label: 'WORKFLOW', icon: <PrintIcon sx={{ fontSize: '13px !important' }} /> },
                { label: 'RESULTS', icon: <FileDownloadIcon sx={{ fontSize: '13px !important' }} /> },
                { label: 'API', icon: <TerminalIcon sx={{ fontSize: '13px !important' }} /> },
              ].map(({ label, icon }) => (
                <Button
                  key={label}
                  variant="outlined"
                  size="small"
                  {...(icon ? { endIcon: icon } : {})}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.72rem',
                    color: '#555',
                    borderColor: '#ccc',
                    py: 0.25,
                    px: 1,
                    minWidth: 0,
                    '&:hover': { borderColor: '#999', bgcolor: 'transparent' },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
            <PaginationControls
              page={page}
              pageSize={PAGE_SIZE}
              total={people.length}
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            />
          </Box>

          {/* Result Rows */}
          {visibleResults.map((result) => (
            <ResultRow
              key={result.id}
              result={result}
              expanded={expandedId === result.id}
              onToggle={() => toggleExpand(result.id)}
            />
          ))}

          {/* Bottom Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              px: 1.5,
              py: 0.75,
              borderTop: '1px solid #e0e0e0',
              bgcolor: '#fafafa',
            }}
          >
            <PaginationControls
              page={page}
              pageSize={PAGE_SIZE}
              total={people.length}
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            />
          </Box>
        </Paper>
      </Container>

    </Box>
  )
}

export default App
