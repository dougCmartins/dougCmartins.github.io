<template>
  <section id="about" class="band" aria-labelledby="about-title">
    <div class="content-width about-grid">
      <SectionHeading :label="copy.about.label" :title="copy.about.title.join(' ')" title-id="about-title" />
      <div class="about-copy reveal">
        <p v-for="paragraph in copy.about.paragraphs" :key="paragraph" class="body">{{ paragraph }}</p>
        <ul class="tech-row">
          <li v-for="item in copy.about.focus" :key="item" class="focus-tag">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="experience" class="band" aria-labelledby="experience-title">
    <div class="content-width">
      <SectionHeading
        :label="copy.experience.label"
        :title="copy.experience.title"
        title-id="experience-title"
        :intro="copy.experience.intro.join(' ')"
      />
      <div class="experience-grid">
        <ExperienceCard
          v-for="job in copy.experience.jobs"
          :key="job.id"
          class="reveal"
          :job="job"
          :read-more="copy.experience.readMore"
        />
      </div>
    </div>
  </section>

  <section id="testimonials" class="band" aria-labelledby="testimonials-title">
    <div class="content-width">
      <SectionHeading
        :label="copy.testimonials.label"
        :title="copy.testimonials.title"
        title-id="testimonials-title"
        :intro="copy.testimonials.intro"
      />
      <div class="quote-grid">
        <article v-for="item in testimonials" :key="item.id" class="testimonial card reveal">
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

  <section id="stack" class="band" aria-labelledby="stack-title">
    <div class="content-width">
      <SectionHeading
        :label="copy.stack.label"
        :title="copy.stack.title"
        title-id="stack-title"
        :intro="copy.stack.intro.join(' ')"
      />
      <div class="stack-groups">
        <div v-for="group in stackGroups" :key="group.name" class="stack-group reveal">
          <h3 class="stack-group__name">{{ group.name }}</h3>
          <ul class="tech-row">
            <li v-for="item in group.items" :key="item" class="tech-tag">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="education" class="band" aria-labelledby="education-title">
    <div class="content-width">
      <SectionHeading :label="copy.education.label" :title="copy.education.title" title-id="education-title" />
      <div class="education-grid">
        <div class="card reveal">
          <p class="column-label">{{ copy.education.academicLabel }}</p>
          <ul class="study-list">
            <li v-for="study in copy.education.academic" :key="study.id">
              <h3 class="card-title">{{ study.title }}</h3>
              <p v-for="line in study.lines" :key="line" class="body">{{ line }}</p>
            </li>
          </ul>
        </div>
        <div class="card reveal">
          <p class="column-label">{{ copy.education.continuingLabel }}</p>
          <ul class="study-list">
            <li v-for="study in copy.education.continuing" :key="study.id">
              <h3 class="card-title">{{ study.title }}</h3>
              <p v-for="line in study.lines" :key="line" class="body">{{ line }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="band contact bg-grid" aria-labelledby="contact-title">
    <div class="content-width contact-inner reveal">
      <p class="code-label">
        <span class="code-label__mark">/*</span> {{ copy.contactSection.label }} <span class="code-label__mark">*/</span>
      </p>
      <h2 id="contact-title" class="contact-title">{{ copy.contactSection.title.join(' ') }}</h2>
      <p class="lede">{{ copy.contactSection.summary }}</p>
      <a class="button button--primary button--lg" :href="`mailto:${contact.email}`">
        {{ copy.contactSection.action }}
        <ButtonArrow />
      </a>
      <div class="contact-links">
        <a class="link-underline" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a class="link-underline" :href="`tel:${contact.phone}`">{{ contact.phoneLabel }}</a>
        <a class="link-underline" :href="contact.github" target="_blank" rel="noreferrer">{{ copy.hero.github }}</a>
        <a class="link-underline" :href="contact.linkedin" target="_blank" rel="noreferrer">{{ copy.hero.linkedin }}</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contact, stackGroupItems, testimonials } from '~/utils/portfolio'

const { copy } = usePortfolioLocale()

const stackGroups = computed(() => copy.value.stack.groups.map((name, index) => {
  const items = [...(stackGroupItems[index] ?? [])]
  const isPractices = index === stackGroupItems.length - 1
  if (!isPractices) {
    return { name, items }
  }

  const observabilityAt = items.indexOf('New Relic')
  if (observabilityAt >= 0) {
    items.splice(observabilityAt, 0, copy.value.stack.observability)
  }

  return {
    name,
    items: [...items, ...copy.value.stack.aiTools],
  }
}))
</script>
