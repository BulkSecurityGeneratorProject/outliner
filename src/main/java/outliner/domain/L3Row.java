package outliner.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A L3Row.
 */
@Entity
@Table(name = "l_3_row")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "l3row")
public class L3Row implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "classification")
    private String classification;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "datetime")
    private Instant datetime;

    @NotNull
    @Column(name = "position", nullable = false)
    private String position;

    @OneToMany(mappedBy = "row", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<L3Cell> cells = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("rows")
    private L3Table table;

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

    public L3Row classification(String classification) {
        this.classification = classification;
        return this;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getTitle() {
        return title;
    }

    public L3Row title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getDatetime() {
        return datetime;
    }

    public L3Row datetime(Instant datetime) {
        this.datetime = datetime;
        return this;
    }

    public void setDatetime(Instant datetime) {
        this.datetime = datetime;
    }

    public String getPosition() {
        return position;
    }

    public L3Row position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Set<L3Cell> getCells() {
        return cells;
    }

    public L3Row cells(Set<L3Cell> l3Cells) {
        this.cells = l3Cells;
        return this;
    }

    public L3Row addCells(L3Cell l3Cell) {
        this.cells.add(l3Cell);
        l3Cell.setRow(this);
        return this;
    }

    public L3Row removeCells(L3Cell l3Cell) {
        this.cells.remove(l3Cell);
        l3Cell.setRow(null);
        return this;
    }

    public void setCells(Set<L3Cell> l3Cells) {
        this.cells = l3Cells;
    }

    public L3Table getTable() {
        return table;
    }

    public L3Row table(L3Table l3Table) {
        this.table = l3Table;
        return this;
    }

    public void setTable(L3Table l3Table) {
        this.table = l3Table;
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
        L3Row l3Row = (L3Row) o;
        if (l3Row.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), l3Row.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "L3Row{" +
            "id=" + getId() +
            ", classification='" + getClassification() + "'" +
            ", title='" + getTitle() + "'" +
            ", datetime='" + getDatetime() + "'" +
            ", position='" + getPosition() + "'" +
            "}";
    }
}
