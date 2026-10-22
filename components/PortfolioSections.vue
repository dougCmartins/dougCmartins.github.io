<template>
  <section id="about" class="band band--light" aria-labelledby="about-title">
    <div class="content-width">
      <div class="section-heading">
        <h2 id="about-title" class="section-title">{{ copy.about.title.join(' ') }}</h2>
      </div>
      <div class="about-copy">
        <p v-for="paragraph in copy.about.paragraphs" :key="paragraph" class="body">{{ paragraph }}</p>
      </div>
      <div class="focus-row">
        <span v-for="item in copy.about.focus" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>
  </section>

  <section id="experience" class="band band--light band--tight-top" aria-labelledby="experience-title">
    <div class="content-width">
      <div class="section-heading">
        <h2 id="experience-title" class="section-title">{{ copy.experience.title }}</h2>
        <p class="lede">{{ copy.experience.intro.join(' ') }}</p>
      </div>
      <div class="case-list">
        <article
          v-for="(job, index) in copy.experience.jobs"
          :key="job.id"
          class="case-study"
          :class="{ 'case-study--reverse': index % 2 === 1, 'case-study--open': isOpen(job.id) }"
        >
          <div class="case-study__copy">
            <span class="tag">{{ job.period }}</span>
            <h3 class="work-title">{{ job.company }}</h3>
            <p class="role-line">{{ job.role }} · {{ job.domain }}</p>
            <p class="body">{{ job.challenge }}</p>
            <button
              class="button button--accent"
              type="button"
              :aria-expanded="isOpen(job.id)"
              :aria-controls="`job-stories-${job.id}`"
              @click="toggleJob(job.id)"
            >
              {{ isOpen(job.id) ? copy.experience.readLess : copy.experience.readMore }}
              <ButtonArrow />
            </button>
            <div v-show="isOpen(job.id)" :id="`job-stories-${job.id}`" class="case-detail">
              <ul class="story-list" :aria-label="copy.experience.impactLabel">
                <li v-for="story in job.stories" :key="story.id">
                  <p v-if="story.before" class="result-compare">
                    <span><strong class="result-value">{{ story.before }}</strong> {{ story.beforeLabel }}</span>
                    <span><strong class="result-value">{{ story.after }}</strong> {{ story.afterLabel }}</span>
                  </p>
                  <p v-else-if="story.value" class="result-figure">
                    <strong class="result-value">{{ story.value }}</strong>
                    <span>{{ story.unit }}</span>
                  </p>
                  <p v-if="story.title" class="result-title">{{ story.title }}</p>
                  <p class="body">{{ story.detail }}</p>
                </li>
              </ul>
              <a class="button button--primary" :href="job.site" target="_blank" rel="noreferrer">
                {{ job.siteLabel }}
                <ButtonArrow />
              </a>
            </div>
          </div>
          <div class="media">
            <img :src="job.shot" width="445" height="300" :alt="job.shotAlt" loading="lazy">
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="testimonials" class="band" aria-labelledby="testimonials-title">
    <div class="content-width">
      <div class="section-heading">
        <h2 id="testimonials-title" class="section-title section-title--inverse">{{ copy.testimonials.title }}</h2>
        <p class="lede">{{ copy.testimonials.intro }}</p>
      </div>
      <div class="quote-grid">
        <article v-for="item in testimonials" :key="item.id" class="testimonial">
          <p class="quote" aria-hidden="true">“</p>
          <p class="body">{{ item.quote }}</p>
          <footer class="testimonial__footer">
            <span class="avatar">
              <img v-if="item.photo" :src="item.photo" width="50" height="50" alt="" loading="lazy">
              <template v-else>{{ item.monogram }}</template>
            </span>
            <div>
              <p class="client-name">{{ item.name }}</p>
              <p class="client-role">{{ item.role }}</p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  </section>

  <section id="stack" class="band band--tight-top" aria-labelledby="stack-title">
    <div class="content-width">
      <div class="section-heading">
        <h2 id="stack-title" class="section-title section-title--inverse">{{ copy.stack.title }}</h2>
        <p class="lede">{{ copy.stack.intro.join(' ') }}</p>
      </div>
      <div class="stack-groups">
        <div v-for="group in stackGroups" :key="group.name">
          <h3>{{ group.name }}</h3>
          <div class="stack-row">
            <span v-for="item in group.items" :key="item" class="stack-chip">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="education" class="band band--light" aria-labelledby="education-title">
    <div class="content-width">
      <div class="section-heading">
        <h2 id="education-title" class="section-title">{{ copy.education.title }}</h2>
      </div>
      <div class="education-grid">
        <div>
          <p class="column-label">{{ copy.education.academicLabel }}</p>
          <ul class="study-list">
            <li v-for="study in copy.education.academic" :key="study.id">
              <h3 class="work-title">{{ study.title }}</h3>
              <p v-for="line in study.lines" :key="line" class="body">{{ line }}</p>
            </li>
          </ul>
        </div>
        <div>
          <p class="column-label">{{ copy.education.continuingLabel }}</p>
          <ul class="study-list">
            <li v-for="study in copy.education.continuing" :key="study.id">
              <h3 class="work-title">{{ study.title }}</h3>
              <p v-for="line in study.lines" :key="line" class="body">{{ line }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="band contact" aria-labelledby="contact-title">
    <div class="content-width">
      <div class="section-heading">
        <p class="lede">{{ copy.contactSection.label }}</p>
        <h2 id="contact-title" class="section-title section-title--inverse">{{ copy.contactSection.title.join(' ') }}</h2>
        <p class="lede">{{ copy.contactSection.summary }}</p>
      </div>
      <a class="button button--primary button--lg" :href="`mailto:${contact.email}`">
        {{ copy.contactSection.action }}
        <ButtonArrow />
      </a>
      <div class="contact-links">
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a :href="`tel:${contact.phone}`">{{ contact.phoneLabel }}</a>
        <a :href="contact.github" target="_blank" rel="noreferrer">{{ copy.hero.github }}</a>
        <a :href="contact.linkedin" target="_blank" rel="noreferrer">{{ copy.hero.linkedin }}</a>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <div class="content-width footer-inner">
      <a href="#top">DCMARTINS.CO</a>
      <span>{{ copy.footer.rights }}</span>
      <a href="#top">{{ copy.footer.backToTop }}</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contact, stackGroupItems, testimonials } from '~/utils/portfolio'

const { copy } = usePortfolioLocale()

const openJobs = ref<Record<string, boolean>>({})

function isOpen(id: string) {
  return openJobs.value[id] === true
}

function toggleJob(id: string) {
  openJobs.value = { ...openJobs.value, [id]: !isOpen(id) }
}

const stackGroups = computed(() => copy.value.stack.groups.map((name, index) => {
  const items = stackGroupItems[index] ?? []
  const isPractices = index === stackGroupItems.length - 1
  return {
    name,
    items: isPractices ? [...items, ...copy.value.stack.aiTools] : items,
  }
}))
</script>
