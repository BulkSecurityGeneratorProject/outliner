package outliner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A L3.
 */
@Entity
@Table(name = "l_3")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "l3")
public class L3 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "classification", nullable = false)
    private String classification;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "position", nullable = false)
    private String position;

    
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @OneToMany(mappedBy = "l3", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<L3Table> tables = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("l3S")
    private L2 l2;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassification() {
        return classification;
    }

    public L3 classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getTitle() {
        return title;
    }

    public L3 title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPosition() {
        return position;
    }

    public L3 position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getContent() {
        return content;
    }

    public L3 content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Set<L3Table> getTables() {
        return tables;
    }

    public L3 tables(Set<L3Table> l3Tables) {
        this.tables = l3Tables;
        return this;
    }

    public L3 addTables(L3Table l3Table) {
        this.tables.add(l3Table);
        l3Table.setL3(this);
        return this;
    }

    public L3 removeTables(L3Table l3Table) {
        this.tables.remove(l3Table);
        l3Table.setL3(null);
        return this;
    }

    public void setTables(Set<L3Table> l3Tables) {
        this.tables = l3Tables;
    }

    public L2 getL2() {
        return l2;
    }

    public L3 l2(L2 l2) {
        this.l2 = l2;
        return this;
    }

    public void setL2(L2 l2) {
        this.l2 = l2;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        L3 l3 = (L3) o;
        if (l3.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), l3.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "L3{" +
            "id=" + getId() +
            ", classification='" + getClassification() + "'" +
            ", title='" + getTitle() + "'" +
            ", position='" + getPosition() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
