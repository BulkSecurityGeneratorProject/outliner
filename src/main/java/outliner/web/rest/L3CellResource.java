package outliner.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import outliner.domain.L3Cell;
import outliner.repository.L3CellRepository;
import outliner.repository.search.L3CellSearchRepository;
import outliner.web.rest.errors.BadRequestAlertException;
import outliner.web.rest.util.HeaderUtil;

/**
 * REST controller for managing L3Cell.
 */
@RestController
@RequestMapping("/api")
public class L3CellResource {

    private final Logger log = LoggerFactory.getLogger(L3CellResource.class);

    private static final String ENTITY_NAME = "l3Cell";

    private final L3CellRepository l3CellRepository;

    private final L3CellSearchRepository l3CellSearchRepository;

    public L3CellResource(L3CellRepository l3CellRepository, L3CellSearchRepository l3CellSearchRepository) {
        this.l3CellRepository = l3CellRepository;
        this.l3CellSearchRepository = l3CellSearchRepository;
    }

    /**
     * POST  /l-3-cells : Create a new l3Cell.
     *
     * @param l3Cell the l3Cell to create
     * @return the ResponseEntity with status 201 (Created) and with body the new l3Cell, or with status 400 (Bad Request) if the l3Cell has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/l-3-cells")
    @Timed
    public ResponseEntity<L3Cell> createL3Cell(@Valid @RequestBody L3Cell l3Cell) throws URISyntaxException {
        log.debug("REST request to save L3Cell : {}", l3Cell);
        if (l3Cell.getId() != null) {
            throw new BadRequestAlertException("A new l3Cell cannot already have an ID", ENTITY_NAME, "idexists");
        }
        L3Cell result = l3CellRepository.save(l3Cell);
        l3CellSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/l-3-cells/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /l-3-cells : Updates an existing l3Cell.
     *
     * @param l3Cell the l3Cell to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated l3Cell,
     * or with status 400 (Bad Request) if the l3Cell is not valid,
     * or with status 500 (Internal Server Error) if the l3Cell couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/l-3-cells")
    @Timed
    public ResponseEntity<L3Cell> updateL3Cell(@Valid @RequestBody L3Cell l3Cell) throws URISyntaxException {
        log.debug("REST request to update L3Cell : {}", l3Cell);
        if (l3Cell.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        L3Cell result = l3CellRepository.save(l3Cell);
        l3CellSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, l3Cell.getId().toString()))
            .body(result);
    }

    /**
     * GET  /l-3-cells : get all the l3Cells.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of l3Cells in body
     */
    @GetMapping("/l-3-cells")
    @Timed
    public List<L3Cell> getAllL3Cells() {
        log.debug("REST request to get all L3Cells");
        return (List<L3Cell>) l3CellRepository.findAll();
    }

    /**
     * GET  /l-3-cells/:id : get the "id" l3Cell.
     *
     * @param id the id of the l3Cell to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the l3Cell, or with status 404 (Not Found)
     */
    @GetMapping("/l-3-cells/{id}")
    @Timed
    public ResponseEntity<L3Cell> getL3Cell(@PathVariable Long id) {
        log.debug("REST request to get L3Cell : {}", id);
        Optional<L3Cell> l3Cell = l3CellRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(l3Cell);
    }

    /**
     * DELETE  /l-3-cells/:id : delete the "id" l3Cell.
     *
     * @param id the id of the l3Cell to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/l-3-cells/{id}")
    @Timed
    public ResponseEntity<Void> deleteL3Cell(@PathVariable Long id) {
        log.debug("REST request to delete L3Cell : {}", id);

        l3CellRepository.deleteById(id);
        l3CellSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/l-3-cells?query=:query : search for the l3Cell corresponding
     * to the query.
     *
     * @param query the query of the l3Cell search
     * @return the result of the search
     */
    @GetMapping("/_search/l-3-cells")
    @Timed
    public List<L3Cell> searchL3Cells(@RequestParam String query) {
        log.debug("REST request to search L3Cells for query {}", query);
        return StreamSupport
            .stream(l3CellSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
